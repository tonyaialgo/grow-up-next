"use client";

import { useEffect, useRef, useState } from "react";
import MainLayout from "@/components/MainLayout";
import { getOrCreateClientUserId } from "@/lib/ai/client-user-id";
import {
  clearStoredAiSessionId,
  getStoredAiSessionId,
  setStoredAiSessionId,
} from "@/lib/ai/chat-session-storage";
import { GraduationCap, Loader2, Sparkles, Trash2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

export default function AcademicAdvisorPage() {
  const [context, setContext] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sid = getStoredAiSessionId("academic_advisor");
    if (sid) setSessionId(sid);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = async () => {
    const text = context.trim();
    if (!text || loading) return;
    setLoading(true);
    setError("");
    setContext("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    try {
      const res = await fetch("/api/ai/academic-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: getOrCreateClientUserId(),
          sessionId: sessionId ?? undefined,
          context: text,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "請求失敗");
        setMessages((m) => m.slice(0, -1));
        return;
      }
      const sid = data.sessionId as string | undefined;
      if (sid) {
        setSessionId(sid);
        setStoredAiSessionId("academic_advisor", sid);
      }
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.markdown || "" },
      ]);
    } catch {
      setError("網絡錯誤");
      setMessages((m) => m.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
    if (sessionId) {
      try {
        await fetch(
          `/api/ai/chat-sessions?sessionId=${encodeURIComponent(sessionId)}&userId=${encodeURIComponent(getOrCreateClientUserId())}`,
          { method: "DELETE" }
        );
      } catch {
        /* ignore */
      }
    }
    clearStoredAiSessionId("academic_advisor");
    setSessionId(null);
    setMessages([]);
    setError("");
  };

  return (
    <MainLayout>
      <section className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">
              <Sparkles className="h-4 w-4" />
              AI 升學顧問
            </div>
            <h1 className="mb-3 text-4xl font-black text-gray-900 md:text-5xl">
              個性化升學建議
            </h1>
            <p className="text-lg font-medium text-gray-600">
              描述孩子背景與期望；可追問細節。AI 會結合學校、升學日曆與學業內容摘要。
            </p>
          </div>

          <div className="rounded-3xl border-2 border-indigo-100 bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-medium text-gray-500">
                多輪對話：每次送出計一次配額（與其他 AI 功能共用每日上限）。
              </p>
              <button
                type="button"
                onClick={clearChat}
                className="inline-flex items-center gap-1 rounded-xl border border-indigo-200 px-3 py-1.5 text-xs font-bold text-indigo-800 hover:bg-indigo-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                新對話
              </button>
            </div>

            <div className="mb-4 max-h-[min(45vh,400px)] space-y-3 overflow-y-auto rounded-2xl bg-indigo-50/50 p-3">
              {messages.length === 0 && (
                <p className="py-6 text-center text-sm text-gray-500">
                  例如：小五男生，喜歡科學與足球，數學較弱…
                </p>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "ml-6 rounded-2xl bg-white p-3 text-sm font-medium text-gray-800 shadow-sm"
                      : "mr-6 whitespace-pre-wrap rounded-2xl bg-white p-3 text-sm font-medium leading-relaxed text-gray-800 shadow-sm"
                  }
                >
                  <span className="mb-1 block text-xs font-bold text-indigo-600/80">
                    {m.role === "user" ? "你" : "AI"}
                  </span>
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="mr-6 flex items-center gap-2 rounded-2xl bg-white p-3 text-sm text-gray-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  生成中…
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <label className="mb-2 block text-sm font-bold text-gray-700">
              {messages.length ? "追問或補充背景" : "孩子與升學背景（可自由輸入）"}
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void handleSubmit();
                }
              }}
              rows={6}
              placeholder="例如：小五男生，喜歡科學與足球，數學較弱，希望入讀 Band 2 英文中學..."
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <p className="mt-2 text-xs text-gray-500">
              Enter 送出，Shift+Enter 換行。內容會經簡易匿名化後再送往模型。
            </p>
            <button
              type="button"
              onClick={() => void handleSubmit()}
              disabled={loading || !context.trim()}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 text-lg font-black text-white shadow-lg transition hover:opacity-95 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <GraduationCap className="h-5 w-5" />
              )}
              {messages.length ? "送出" : "生成升學建議"}
            </button>
            {error && (
              <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
                {error}
              </p>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
