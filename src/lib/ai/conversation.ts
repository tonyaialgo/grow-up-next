import type { ChatTurn } from "./chat-store";

/** Short summary of the last user+assistant pair for prompt injection */
export function buildConversationSummary(
  priorTurns: ChatTurn[],
  maxChars: number = 1200
): string {
  if (priorTurns.length === 0) return "（無）";
  const lastUser = [...priorTurns].reverse().find((t) => t.role === "user");
  const lastAsst = [...priorTurns].reverse().find((t) => t.role === "assistant");
  if (!lastUser) return "（無）";
  let s = "";
  if (lastUser) {
    s += `使用者上一則：${lastUser.content.slice(0, 600)}`;
  }
  if (lastAsst) {
    s += `\n助手上一則摘要：${lastAsst.content.slice(0, 500)}`;
  }
  if (s.length > maxChars) return `${s.slice(0, maxChars)}\n[已截斷]`;
  return s;
}

/** Chat turns for LLM (system message added separately by caller). */
export function turnsToLlmMessages(
  priorTurns: ChatTurn[],
  lastUserContent: string
): { role: "user" | "assistant"; content: string }[] {
  return [...priorTurns, { role: "user" as const, content: lastUserContent }];
}
