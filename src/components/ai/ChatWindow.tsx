"use client";

import { RefObject } from "react";
import { motion } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { Message } from "@/types/Chat";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  layoutId: string;
  input: string;
  loading: boolean;
  messages: Message[];
  bottomRef: RefObject<HTMLDivElement | null>;
  onInputChange: (v: string) => void;
  onSend: () => void;
};

const SPRING = { duration: 0.32, ease: [0.22, 1, 0.36, 1] } as const;

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="flex gap-1.5 rounded-2xl border border-white/5 bg-zinc-900 px-4 py-3">
        {[0, 120, 240].map((delay) => (
          <span
            key={delay}
            className="h-2 w-2 rounded-full bg-zinc-500 animate-pulse"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function Bubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
          max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
          ${
            isUser
              ? "bg-white text-black"
              : "border border-white/5 bg-zinc-900 text-zinc-100"
          }
        `}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

function TriggerButton({
  layoutId,
  onClick,
}: {
  layoutId: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      layoutId={layoutId}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={SPRING}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      aria-label="Open chat"
      className="
        fixed bottom-5 right-5 z-[9999]
        flex h-13 w-13 items-center justify-center
        rounded-full border border-white/10 bg-zinc-950 text-white
        shadow-[0_8px_32px_rgba(0,0,0,0.5)]
        will-change-transform
      "
    >
      <MessageCircle size={22} />
    </motion.button>
  );
}

export default function ChatWindow({
  open,
  setOpen,
  layoutId,
  input,
  loading,
  messages,
  bottomRef,
  onInputChange,
  onSend,
}: Props) {
  if (!open) {
    return <TriggerButton layoutId={layoutId} onClick={() => setOpen(true)} />;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
      />

      <motion.div
        layoutId={layoutId}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="
          fixed z-[9999]

          /* Mobile: full screen but safe */
          inset-x-0 bottom-0 top-0
          flex flex-col
          max-h-[100dvh] w-full

          /* Tablet/Desktop: floating panel */
          sm:inset-auto sm:bottom-5 sm:right-5
          sm:h-[min(700px,85dvh)]
          sm:w-[min(420px,calc(100vw-2.5rem))]
          sm:rounded-3xl

          overflow-hidden
          bg-zinc-950
          border-t border-white/10
          sm:border sm:border-white/10

          shadow-[0_24px_80px_rgba(0,0,0,0.7)]
          will-change-transform
        "
      >
        <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300">
              <Bot size={16} />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">Afif AI</h2>
              <p className="text-[11px] text-zinc-500">Always online</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
          >
            <X size={16} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3">
          {messages.map((msg, i) => (
            <Bubble key={i} message={msg} />
          ))}
          {loading && <TypingDots />}
          <div ref={bottomRef} />
        </div>

        <footer className="shrink-0 border-t border-white/10 p-3">
          <div className="flex gap-2 rounded-2xl border border-white/10 bg-zinc-900 p-1.5">
            <input
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
              placeholder="Ask something..."
              className="flex-1 bg-transparent px-3 py-1 text-sm text-white placeholder:text-zinc-600 outline-none"
            />
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={onSend}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black disabled:opacity-40 transition-opacity"
            >
              <Send size={15} />
            </motion.button>
          </div>
        </footer>
      </motion.div>
    </>
  );
}
