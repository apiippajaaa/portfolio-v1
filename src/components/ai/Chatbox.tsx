"use client";

import { useState } from "react";
import { Bot, Send, X, MessageCircle } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi!! I'm Afif AI. Ask me anything.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition"
      >
        <MessageCircle size={22} />
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-125 w-90 flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
            <div className="flex items-center gap-2">
              <Bot size={18} />
              <span className="font-medium">Ask Afif AI</span>
            </div>

            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-white text-black"
                    : "bg-white/10 text-white"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="w-fit rounded-2xl bg-white/10 px-4 py-3">
                Thinking...
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Ask something..."
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
              />

              <button
                onClick={sendMessage}
                className="rounded-xl border border-white/10 bg-white/10 px-4"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
