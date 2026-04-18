import { createAdminClient } from "@/lib/supabase/server";
import type { LlmProvider } from "./types";

export interface LlmConfigRow {
  id: string;
  provider: LlmProvider;
  model: string;
  openai_base_url: string | null;
}

export async function getLlmConfig(): Promise<LlmConfigRow | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("ai_llm_config")
    .select("id, provider, model, openai_base_url")
    .eq("id", "default")
    .maybeSingle();

  if (error || !data) return null;
  return data as LlmConfigRow;
}
