export type LlmProvider = "openai" | "openrouter" | "gemini";

export interface LlmMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LlmCallResult {
  text: string;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  provider: LlmProvider;
  model: string;
}

export type AiFeatureKey =
  | "academic_advisor"
  | "growth_interpreter"
  | "parent_support"
  | "site_assistant";
