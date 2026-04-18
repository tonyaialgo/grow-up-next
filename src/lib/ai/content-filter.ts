const DEFAULT_MAX_INPUT = 4000;
const DEFAULT_MAX_OUTPUT = 12000;

export function clampText(
  text: string,
  maxChars: number = DEFAULT_MAX_INPUT
): string {
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars)}\n\n[內容已截斷以符合長度限制]`;
}

export function clampOutput(
  text: string,
  maxChars: number = DEFAULT_MAX_OUTPUT
): string {
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars)}\n\n[輸出已截斷]`;
}
