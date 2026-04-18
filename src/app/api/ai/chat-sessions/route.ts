import { NextRequest, NextResponse } from "next/server";
import {
  createChatSession,
  deleteChatSession,
  type AiChatFeature,
} from "@/lib/ai/chat-store";

const FEATURES: AiChatFeature[] = [
  "parent_support",
  "site_assistant",
  "academic_advisor",
  "growth_interpreter",
];

function parseFeature(v: unknown): AiChatFeature | null {
  if (typeof v !== "string") return null;
  return FEATURES.includes(v as AiChatFeature) ? (v as AiChatFeature) : null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId =
      typeof body.userId === "string" && body.userId.trim()
        ? body.userId.trim()
        : null;
    if (!userId) {
      return NextResponse.json({ error: "需要 userId" }, { status: 400 });
    }
    const feature = parseFeature(body.feature);
    if (!feature) {
      return NextResponse.json({ error: "無效的 feature" }, { status: 400 });
    }

    const lastGrowthPayload =
      feature === "growth_interpreter" && body.lastGrowthPayload !== undefined
        ? body.lastGrowthPayload
        : undefined;

    const id = await createChatSession(userId, feature, {
      lastGrowthPayload,
    });
    return NextResponse.json({ sessionId: id });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "未知錯誤";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    const userId = searchParams.get("userId");
    if (!sessionId || !userId) {
      return NextResponse.json(
        { error: "需要 sessionId 與 userId" },
        { status: 400 }
      );
    }
    await deleteChatSession(sessionId, userId);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "未知錯誤";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
