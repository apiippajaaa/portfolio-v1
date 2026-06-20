"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";

import ChatWindow from "./ChatWindow";
import { useChat } from "@/hooks/useChat";
import { CHAT_LAYOUT_ID } from "@/types/Chat";

export default function ChatWithAi() {
  const [open, setOpen] = useState(false);
  const chat = useChat();

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait">
        <ChatWindow
          key="chat-window"
          open={open}
          setOpen={setOpen}
          layoutId={CHAT_LAYOUT_ID}
          {...chat}
          onInputChange={chat.setInput}
          onSend={chat.sendMessage}
        />
      </AnimatePresence>
    </LayoutGroup>
  );
}
