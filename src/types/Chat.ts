export type Role = "user" | "assistant";

export type Message = {
  role: Role;
  content: string;
};

export const CHAT_LAYOUT_ID = "afif-ai-chat";

export const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    content: "Hi! I'm Afif AI. Ask me anything.",
  },
];