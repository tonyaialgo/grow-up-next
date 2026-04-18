"use client";

import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { getOrCreateClientUserId } from "@/lib/ai/client-user-id";
import { Bot, Loader2 } from "lucide-react";

export default function SiteAssistantPage() {
  const [message, setMessage] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const send = async () => {
    setLoading(true);
    setError("");
    setMarkdown("");
    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: getOrCreateClientUserId(),
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "請求失敗");
        return;
      }
      setMarkdown(data.markdown || "");
    } catch {
      setError("網絡錯誤");
    } finally {
      setLoading(false);
    }
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

          <div className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-xl">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="例如：哪裡可以找到學校資料？健康百科在哪？"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button
              type="button"
              onClick={send}
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

          {markdown && (
            <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-lg">
              <div className="whitespace-pre-wrap font-medium leading-relaxed text-gray-800">
                {markdown}
              </div>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
