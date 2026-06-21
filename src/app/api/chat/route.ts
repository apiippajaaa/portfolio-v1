import { portfolio } from "@/data/portfolio";
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "user" | "assistant";
type Lang = "id" | "en";

interface ChatMessage {
  role: Role;
  content: string;
}

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
  projectContext?: string;
}



// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_HISTORY = 4;
const MAX_TOKENS = 160;
const MODEL = "llama-3.1-8b-instant" as const;

/**
 * Whitelist: clear portfolio signals → skip LLM classifier entirely.
 * Intentionally minimal — covers only high-confidence cases.
 */
const PORTFOLIO_SIGNALS: RegExp[] = [
  /\bafif\b/i,
  /project|portfolio|karya|proyek/i,
  /experience|pengalaman|kerja|karir/i,
  /contact|hire|rekrut|hubungi|collab/i,
  /skill|tech|stack|teknologi/i,
  /fullstack|frontend|backend|developer|designer|videographer/i,
  /react|next\.?js|node|vue|laravel|typescript|javascript|tailwind|figma/i,
];

const OFF_TOPIC_REPLY: Record<Lang, string> = {
  id: "Saya hanya bisa menjawab pertanyaan seputar Afif — skill, proyek, pengalaman, atau cara menghubunginya. Ada yang ingin kamu tanyakan?",
  en: "I'm here to answer questions about Afif — his skills, projects, experience, or how to reach him. What would you like to know?",
};

// ─── Groq singleton ───────────────────────────────────────────────────────────

let groqClient: Groq | null = null;

function getGroq(): Groq {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("GROQ_API_KEY is not set.");
    groqClient = new Groq({ apiKey });
  }
  return groqClient;
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function extractSkills(): string[] {
  return portfolio.skills.map((s) => s.toLowerCase());
}

function detectLanguage(text: string): Lang {
  return /apa|yang|dan|atau|dengan|saya|kamu|ini|itu|bisa|tolong|boleh|siapa|gimana|bagaimana|berikan/i.test(
    text
  )
    ? "id"
    : "en";
}

function isPortfolioSignal(message: string): boolean {
  return PORTFOLIO_SIGNALS.some((p) => p.test(message));
}

/**
 * LLM-based relevance gate. Called only when no whitelist signal matched.
 * Uses a single‑token response to minimize cost.
 */
async function isRelevantViaLLM(groq: Groq, message: string): Promise<boolean> {
  try {
    const result = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a strict relevance filter for a personal portfolio chatbot.\n" +
            "A message is RELEVANT only if it asks about: a specific person's identity, skills, tech stack, projects, work experience, education, or how to contact/hire them.\n" +
            "Everything else (math, news, recipes, religion, weather, general knowledge, trivia, other people) is IRRELEVANT.\n" +
            'Reply with a single word: "yes" or "no".',
        },
        { role: "user", content: message },
      ],
      temperature: 0,
      max_tokens: 3,
    });

    const answer =
      result.choices?.[0]?.message?.content?.trim().toLowerCase() ?? "no";
    return answer.startsWith("yes");
  } catch {
    // Fail open — let the main LLM handle it with its OFFTOPIC guard
    return true;
  }
}

function buildContext(message: string, skills: string[]): unknown {
  const lower = message.toLowerCase();
  const matchedSkill = skills.find((s) => lower.includes(s));

  if (matchedSkill) return { skill: matchedSkill, summary: portfolio.summary };
  if (/project|portfolio|karya|proyek/i.test(message)) return portfolio.projects.slice(0, 2);
  if (/experience|pengalaman|kerja|karir/i.test(message)) return portfolio.experience.slice(0, 2);
  if (/skill|tech|stack|teknologi/i.test(message)) return portfolio.skillsByCategory;
  if (/contact|hire|rekrut|hubungi|collab/i.test(message)) {
    return { contact: portfolio.contact, summary: portfolio.summary };
  }
  return { name: portfolio.name, role: portfolio.role, summary: portfolio.summary };
}

function buildSystemPrompt(lang: Lang, context: unknown, projectContext?: string): string {
  return `You are an AI assistant inside Afif's personal portfolio website.
Your sole purpose: help visitors learn about Afif — his skills, projects, experience, and contact info.

LANGUAGE: Respond only in ${lang === "id" ? "Bahasa Indonesia" : "English"}.
${projectContext ? `\nPROJECT CONTEXT:\n${projectContext}\n` : ""}
PORTFOLIO DATA:
${JSON.stringify(context)}

PERSONA: Afif is a fullstack developer, designer, and videographer — fast learner, adaptable, open to opportunities.

RULES:
1. If the question is unrelated to Afif or his portfolio → reply exactly: OFFTOPIC
2. Use only the data above. Never hallucinate.
3. Max 3 sentences. No filler, no repetition.
4. Skill in data → speak confidently. Skill missing → highlight fast-learning ability.
5. Tone: natural, modern, persuasive. Lead with strengths.
6. Never use: "meskipun", "although", "however".`.trim();
}

function sanitizeHistory(raw: ChatMessage[] | undefined): ChatMessage[] {
  return (raw ?? [])
    .filter(
      (m): m is ChatMessage =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_HISTORY);
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: Request): Promise<NextResponse> {
  // Parse & validate request
  let body: ChatRequest;
  try {
    body = (await req.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ reply: "Invalid request body." }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json({ reply: "Message cannot be empty." }, { status: 400 });
  }

  let groq: Groq;
  try {
    groq = getGroq();
  } catch {
    return NextResponse.json({ reply: "Server configuration error." }, { status: 500 });
  }

  const lang = detectLanguage(message);

  // ── Gate 1: Whitelist (free) ──────────────────────────────────────────────
  // ── Gate 2: LLM classifier (~3 tokens) — only if no whitelist match ───────
  const isRelevant =
    isPortfolioSignal(message) || (await isRelevantViaLLM(groq, message));

  if (!isRelevant) {
    return NextResponse.json({ reply: OFF_TOPIC_REPLY[lang] });
  }

  // ── Main LLM call ─────────────────────────────────────────────────────────
  const skills = extractSkills();
  const context = buildContext(message, skills);
  const systemPrompt = buildSystemPrompt(lang, context, body.projectContext);
  const history = sanitizeHistory(body.history);

  try {
    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        ...history,
        { role: "user", content: message },
      ],
      temperature: 0.4,
      max_tokens: MAX_TOKENS,
    });

    const rawReply = completion.choices?.[0]?.message?.content?.trim() ?? "";

    // Safety net: catch OFFTOPIC signal from main LLM
    if (!rawReply || rawReply.toUpperCase().startsWith("OFFTOPIC")) {
      return NextResponse.json({ reply: OFF_TOPIC_REPLY[lang] });
    }

    return NextResponse.json({ reply: rawReply });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("Groq API error:", err.message);

    return NextResponse.json(
      {
        reply:
          lang === "id"
            ? "Terjadi kesalahan. Silakan coba lagi nanti."
            : "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}