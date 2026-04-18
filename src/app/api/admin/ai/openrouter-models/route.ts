import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";

type OpenRouterModel = {
  id: string;
  name?: string;
  context_length?: number;
};

/**
 * Proxies OpenRouter GET /api/v1/models so the admin UI can list models
 * without exposing the API key to the browser.
 */
export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "未授權" }, { status: 401 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "未設定 OPENROUTER_API_KEY，無法取得模型列表。請於部署環境加入金鑰後重新整理。",
        models: [],
      },
      { status: 503 }
    );
  }

  /** Prefer full list; optional query can narrow (e.g. output_modalities=text). */
  const modalities = req.nextUrl.searchParams.get("output_modalities");
  const urls = [
    "https://openrouter.ai/api/v1/models",
    ...(modalities
      ? [
          `https://openrouter.ai/api/v1/models?output_modalities=${encodeURIComponent(
            modalities
          )}`,
        ]
      : []),
  ];

  let lastErr = "";
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const t = await res.text();
        lastErr = `HTTP ${res.status}: ${t.slice(0, 300)}`;
        continue;
      }

      const json = (await res.json()) as {
        data?: OpenRouterModel[];
      };

      const raw = Array.isArray(json.data) ? json.data : [];

      const models = raw
        .map((m) => ({
          id: m.id,
          name: m.name?.trim() || m.id,
          context_length: m.context_length ?? null,
        }))
        .filter((m) => m.id.length > 0)
        .sort((a, b) => a.name.localeCompare(b.name, "en"));

      return NextResponse.json({ models, source: "openrouter" });
    } catch (e) {
      lastErr = e instanceof Error ? e.message : "fetch failed";
    }
  }

  return NextResponse.json(
    { error: lastErr || "無法取得 OpenRouter 模型列表", models: [] },
    { status: 502 }
  );
}
