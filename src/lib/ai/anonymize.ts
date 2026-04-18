/**
 * Lightweight PII reduction before sending text to external LLMs.
 * Not a substitute for legal review; reduces obvious email/phone patterns.
 */
export function anonymizeForLlm(text: string): string {
  let out = text;
  out = out.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    "[email]"
  );
  out = out.replace(/(?:\+852\s?)?[2-9]\d{3}\s?\d{4}/g, "[phone]");
  out = out.replace(/\b\d{4}\s?\d{4}\b/g, "[phone]");
  return out;
}
