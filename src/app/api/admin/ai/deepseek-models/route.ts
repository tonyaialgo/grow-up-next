import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";

type DeepSeekModel = {
  id: string;
  object?: string;
  owned_by?: string;
};

/**
 * Proxies DeepSeek GET /models (OpenAI-compatible).
 * https://api-docs.deepseek.com/api/list-models
 */
export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "未授權" }, { status: 401 });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "未設定 DEEPSEEK_API_KEY，無法取得模型列表。請於部署環境加入金鑰後重新整理。",
        models: [],
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.deepseek.com/v1/models", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const t = await res.text();
      return NextResponse.json(
        { error: `HTTP ${res.status}: ${t.slice(0, 300)}`, models: [] },
        { status: 502 }
      );
    }

    const json = (await res.json()) as { data?: DeepSeekModel[] };
    const raw = Array.isArray(json.data) ? json.data : [];

    const models = raw
      .map((m) => ({
        id: m.id,
        name: m.id,
        ...(m.owned_by ? { owned_by: m.owned_by } : {}),
      }))
      .filter((m) => m.id.length > 0)
      .sort((a, b) => a.id.localeCompare(b.id, "en"));

    return NextResponse.json({ models, source: "deepseek" });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "fetch failed";
    return NextResponse.json({ error: msg, models: [] }, { status: 502 });
  }
}
