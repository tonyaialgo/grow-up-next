import { createAdminClient } from "@/lib/supabase/server";
import type { AiFeatureKey } from "./types";

export async function getActivePrompt(featureKey: AiFeatureKey) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("ai_prompts")
    .select("feature_key, name, system_prompt, user_template")
    .eq("feature_key", featureKey)
    .maybeSingle();

  if (error) return null;
  return data as {
    feature_key: string;
    name: string;
    system_prompt: string;
    user_template: string | null;
  } | null;
}

export function applyTemplate(
  template: string | null,
  vars: Record<string, string>
): string {
  if (!template) return "";
  let out = template;
  for (const [k, v] of Object.entries(vars)) {
    out = out.split(`{{${k}}}`).join(v);
  }
  return out;
}
