import type { LlmCallResult, LlmMessage, LlmProvider } from "./types";

export interface LlmGatewayOptions {
  provider: LlmProvider;
  model: string;
  messages: LlmMessage[];
  maxOutputTokens?: number;
  temperature?: number;
  openaiBaseUrl?: string | null;
}

function getOpenAiKey(): string | undefined {
  return process.env.OPENAI_API_KEY;
}

function getOpenRouterKey(): string | undefined {
  return process.env.OPENROUTER_API_KEY;
}

function getGeminiKey(): string | undefined {
  return process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
}

async function callGemini(
  model: string,
  messages: LlmMessage[],
  maxOutputTokens: number,
  temperature: number
): Promise<LlmCallResult> {
  const key = getGeminiKey();
  if (!key) {
    throw new Error("Missing GOOGLE_GENERATIVE_AI_API_KEY or GEMINI_API_KEY");
  }

  const system = messages.find((m) => m.role === "system")?.content ?? "";
  const rest = messages.filter((m) => m.role !== "system");
  /** Gemini REST: first content block must be role "user" */
  const contents =
    rest.length === 1 && rest[0].role === "user"
      ? [
          {
            role: "user" as const,
            parts: [
              {
                text: system
                  ? `${system}\n\n${rest[0].content}`
                  : rest[0].content,
              },
            ],
          },
        ]
      : rest.map((m) => ({
          role: m.role === "assistant" ? ("model" as const) : ("user" as const),
          parts: [{ text: m.content }],
        }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent?key=${encodeURIComponent(key)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature,
        maxOutputTokens,
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini HTTP ${res.status}: ${errText.slice(0, 500)}`);
  }

  const data = (await res.json()) as {
    usageMetadata?: {
      promptTokenCount?: number;
      candidatesTokenCount?: number;
      totalTokenCount?: number;
    };
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  const text =
    data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ??
    "";

  return {
    text,
    promptTokens: data.usageMetadata?.promptTokenCount,
    completionTokens: data.usageMetadata?.candidatesTokenCount,
    totalTokens: data.usageMetadata?.totalTokenCount,
    provider: "gemini",
    model,
  };
}

export async function callLlm(
  options: LlmGatewayOptions
): Promise<LlmCallResult> {
  const maxOutputTokens = options.maxOutputTokens ?? 2048;
  const temperature = options.temperature ?? 0.6;

  if (options.provider === "gemini") {
    return callGemini(
      options.model,
      options.messages,
      maxOutputTokens,
      temperature
    );
  }

  const baseUrl =
    options.provider === "openrouter"
      ? "https://openrouter.ai/api/v1"
      : options.openaiBaseUrl?.trim() ||
        process.env.OPENAI_BASE_URL?.trim() ||
        "https://api.openai.com/v1";

  const apiKey =
    options.provider === "openrouter"
      ? getOpenRouterKey()
      : getOpenAiKey();

  if (!apiKey) {
    throw new Error(
      options.provider === "openrouter"
        ? "Missing OPENROUTER_API_KEY"
        : "Missing OPENAI_API_KEY"
    );
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  if (options.provider === "openrouter") {
    headers["HTTP-Referer"] =
      process.env.OPENROUTER_HTTP_REFERER || "https://growup.hk";
    headers["X-Title"] = process.env.OPENROUTER_APP_TITLE || "GrowUp";
  }

  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: options.model,
      messages: options.messages,
      temperature,
      max_tokens: maxOutputTokens,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`LLM HTTP ${res.status}: ${errText.slice(0, 500)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
    usage?: {
      prompt_tokens?: number;
      completion_tokens?: number;
      total_tokens?: number;
    };
  };

  const text = data.choices?.[0]?.message?.content ?? "";
  return {
    text,
    promptTokens: data.usage?.prompt_tokens,
    completionTokens: data.usage?.completion_tokens,
    totalTokens: data.usage?.total_tokens,
    provider: options.provider === "openrouter" ? "openrouter" : "openai",
    model: options.model,
  };
}
