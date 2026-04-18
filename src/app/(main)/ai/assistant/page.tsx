"use client";

import { useEffect, useRef, useState } from "react";
import MainLayout from "@/components/MainLayout";
import { getOrCreateClientUserId } from "@/lib/ai/client-user-id";
import {
  clearStoredAiSessionId,
  getStoredAiSessionId,
  setStoredAiSessionId,
} from "@/lib/ai/chat-session-storage";
import { Bot, Loader2, Trash2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

export default function SiteAssistantPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sid = getStoredAiSessionId("site_assistant");
    if (sid) setSessionId(sid);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = message.trim();
    if (!text || loading) return;
    setLoading(true);
    setError("");
    setMessage("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: getOrCreateClientUserId(),
          sessionId: sessionId ?? undefined,
          message: text,
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
        setStoredAiSessionId("site_assistant", sid);
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
    clearStoredAiSessionId("site_assistant");
    setSessionId(null);
    setMessages([]);
    setError("");
  };

  return (
    <MainLayout>
      <section className="min-h-screen bg-gradient-to-b from-cyan-50 to-white py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-bold text-cyan-800">
              <Bot className="h-4 w-4" />
              AI 全站助手
            </div>
            <h1 className="mb-3 text-4xl font-black text-gray-900">問我平台功能與內容</h1>
            <p className="text-lg font-medium text-gray-600">
              我會根據平台內可檢索的摘要回答，並引導你到相關頁面。
            </p>
          </div>

          <div className="flex min-h-[420px] flex-col rounded-3xl border border-cyan-100 bg-white p-4 shadow-xl sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium text-gray-500">
                支援多輪追問；對話與伺服器 session 同步。
              </p>
              <button
                type="button"
                onClick={clearChat}
                className="inline-flex items-center gap-1 rounded-xl border border-cyan-200 px-3 py-1.5 text-xs font-bold text-cyan-800 hover:bg-cyan-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                新對話
              </button>
            </div>

            <div className="mb-4 flex-1 space-y-3 overflow-y-auto rounded-2xl bg-cyan-50/50 p-3 min-h-[240px] max-h-[min(50vh,420px)]">
              {messages.length === 0 && (
                <p className="py-8 text-center text-sm font-medium text-gray-500">
                  例如：哪裡可以找到學校資料？健康百科在哪？
                </p>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "ml-8 rounded-2xl bg-white p-3 text-sm font-medium text-gray-800 shadow-sm"
                      : "mr-8 whitespace-pre-wrap rounded-2xl bg-white p-3 text-sm font-medium leading-relaxed text-gray-800 shadow-sm"
                  }
                >
                  <span className="mb-1 block text-xs font-bold text-cyan-700/80">
                    {m.role === "user" ? "你" : "AI"}
                  </span>
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="mr-8 flex items-center gap-2 rounded-2xl bg-white p-3 text-sm text-gray-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  思考中…
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              rows={4}
              placeholder="輸入問題…（Enter 送出，Shift+Enter 換行）"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={loading || !message.trim()}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-black text-white shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Bot className="h-5 w-5" />
              )}
              提問
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
