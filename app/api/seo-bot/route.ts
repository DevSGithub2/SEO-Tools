import { NextResponse } from "next/server";

// In-memory cache for the validated active model
let cachedActiveModel: string | null = null;
let lastModelCheck = 0;
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

const CLAUDE_STYLE_SYSTEM_PROMPT = `You are FastSEOKit Copilot. Follow Claude's signature response style strictly:

1. Tone & Form:
   - Direct, intellectually honest, neutral, and highly concise.
   - Never start with conversational filler or preamble (do NOT say: "Sure!", "Here is what you need", "I'd be happy to help", "Certainly!"). Start directly with the answer or recommendation.
   - No preachy conclusions or sign-offs (do NOT add "Let me know if you need anything else!").

2. Structure:
   - Lead directly with the primary conclusion or action.
   - Use succinct bullet points for recommendations or tradeoffs.
   - If writing code or tags (HTML, robots.txt, XML sitemap, JSON-LD schema), provide clean, fenced code blocks with appropriate syntax highlighting without redundant commentary.
   - Maximum 150-250 words per response unless the user explicitly requests an exhaustive breakdown.`;

async function resolveActiveGroqModel(apiKey: string): Promise<string> {
  const now = Date.now();
  if (cachedActiveModel && now - lastModelCheck < CACHE_TTL_MS) {
    return cachedActiveModel;
  }

  try {
    const listRes = await fetch("https://api.groq.com/openai/v1/models", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (listRes.ok) {
      const data = await listRes.json();
      const availableIds: string[] = (data.data || [])
        .map((m: any) => m.id)
        .filter((id: string) => !id.includes("whisper") && !id.includes("guard"));

      // Priority list of preferred conversational models
      const preferences = [
        "openai/gpt-oss-20b",
        "openai/gpt-oss-120b",
        "meta-llama/llama-4-scout-17b-16e-instruct",
        "qwen/qwen3-32b",
        "llama-3.3-70b-versatile",
        "llama-3.1-8b-instant",
      ];

      for (const pref of preferences) {
        if (availableIds.includes(pref)) {
          cachedActiveModel = pref;
          lastModelCheck = now;
          return pref;
        }
      }

      // If none of our preferred models are matched, pick the first available text model
      if (availableIds.length > 0) {
        cachedActiveModel = availableIds[0];
        lastModelCheck = now;
        return cachedActiveModel;
      }
    }
  } catch {
    // Fallback to stable production model if list request fails
  }

  return "openai/gpt-oss-20b";
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured in .env.local" },
        { status: 500 }
      );
    }

    const activeModel = await resolveActiveGroqModel(apiKey);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: activeModel,
        temperature: 0.3,
        max_tokens: 750,
        messages: [
          {
            role: "system",
            content: CLAUDE_STYLE_SYSTEM_PROMPT,
          },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      // If the cached model failed, invalidate cache and return error details
      cachedActiveModel = null;
      const errData = await response.json().catch(() => null);
      return NextResponse.json(
        { error: errData?.error?.message || response.statusText },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response generated.";

    return NextResponse.json({ reply, modelUsed: activeModel });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
