"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AdminPromptEditPage() {
  const params = useParams();
  const featureKey = params.featureKey as string;

  const [systemPrompt, setSystemPrompt] = useState("");
  const [userTemplate, setUserTemplate] = useState("");
  const [note, setNote] = useState("");
  const [testInput, setTestInput] = useState("測試：請簡短回覆。");
  const [testOut, setTestOut] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [versions, setVersions] = useState<
    { id: string; created_at: string; note: string | null }[]
  >([]);
  const [restoringId, setRestoringId] = useState<string | null>(null);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_token")
      : null;

  const loadPrompt = useCallback(async () => {
    const res = await fetch(`/api/admin/ai/prompts/${featureKey}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok && data.prompt) {
      setSystemPrompt(data.prompt.system_prompt);
      setUserTemplate(data.prompt.user_template || "");
    }
    if (res.ok && Array.isArray(data.versions)) {
      setVersions(data.versions);
    }
  }, [featureKey, token]);

  useEffect(() => {
    (async () => {
      await loadPrompt();
      setLoading(false);
    })();
  }, [loadPrompt]);

  const save = async () => {
    setSaving(true);
    try {
      await fetch(`/api/admin/ai/prompts/${featureKey}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          system_prompt: systemPrompt,
          user_template: userTemplate,
          note: note || null,
        }),
      });
      setNote("");
      await loadPrompt();
    } finally {
      setSaving(false);
    }
  };

  const restoreVersion = async (versionId: string) => {
    setRestoringId(versionId);
    try {
      const res = await fetch(
        `/api/admin/ai/prompts/${featureKey}/restore`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ versionId }),
        }
      );
      const data = await res.json();
      if (res.ok && data.system_prompt) {
        setSystemPrompt(data.system_prompt);
        setUserTemplate(data.user_template || "");
      }
      await loadPrompt();
    } finally {
      setRestoringId(null);
    }
  };

  const test = async () => {
    setTesting(true);
    setTestOut("");
    try {
      const res = await fetch(`/api/admin/ai/prompts/${featureKey}/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ testInput }),
      });
      const data = await res.json();
      if (res.ok) {
        setTestOut(data.markdown || "");
      } else {
        setTestOut(`錯誤：${data.error || res.status}`);
      }
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return <div className="text-gray-500">載入中…</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/admin/ai/prompts"
        className="text-sm font-bold text-primary-600 hover:underline"
      >
        ← 返回列表
      </Link>
      <h1 className="text-2xl font-black text-gray-900">編輯提示詞</h1>
      <p className="font-mono text-sm text-gray-500">{featureKey}</p>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold">系統提示（System）</label>
        <textarea
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          rows={10}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 font-mono text-sm"
        />

        <label className="mb-2 mt-4 block text-sm font-bold">
          使用者模板（可用變數：視功能而定，如 {"{{user_context}}"}、
          {"{{school_context}}"}、{"{{payload}}"}、{"{{message}}"}、
          {"{{rag_context}}"}）
        </label>
        <textarea
          value={userTemplate}
          onChange={(e) => setUserTemplate(e.target.value)}
          rows={8}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 font-mono text-sm"
        />

        <label className="mb-2 mt-4 block text-sm font-bold">
          版本備註（可選）
        </label>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5"
          placeholder="本次修改說明"
        />

        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="mt-4 rounded-xl bg-primary-600 px-6 py-2.5 font-black text-white hover:bg-primary-700 disabled:opacity-50"
        >
          {saving ? "儲存中…" : "儲存並寫入版本紀錄"}
        </button>

        {versions.length > 0 && (
          <div className="mt-8 border-t border-gray-100 pt-6">
            <h2 className="mb-3 font-black text-gray-900">版本紀錄</h2>
            <p className="mb-3 text-sm text-gray-600">
              點「還原」會將該版本套回為目前生效提示詞，並新增一筆還原紀錄。
            </p>
            <ul className="max-h-56 space-y-2 overflow-y-auto text-sm">
              {versions.map((v) => (
                <li
                  key={v.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2"
                >
                  <span className="font-mono text-xs text-gray-500">
                    {new Date(v.created_at).toLocaleString()}
                    {v.note ? ` · ${v.note}` : ""}
                  </span>
                  <button
                    type="button"
                    disabled={restoringId === v.id}
                    onClick={() => void restoreVersion(v.id)}
                    className="rounded-lg bg-gray-200 px-3 py-1 text-xs font-bold text-gray-800 hover:bg-gray-300 disabled:opacity-50"
                  >
                    {restoringId === v.id ? "還原中…" : "還原此版本"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-6">
        <h2 className="mb-2 font-black text-gray-900">測試 LLM</h2>
        <textarea
          value={testInput}
          onChange={(e) => setTestInput(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3"
        />
        <button
          type="button"
          onClick={test}
          disabled={testing}
          className="mt-3 rounded-xl bg-amber-600 px-6 py-2.5 font-black text-white hover:bg-amber-700 disabled:opacity-50"
        >
          {testing ? "呼叫中…" : "執行測試"}
        </button>
        {testOut && (
          <div className="mt-4 whitespace-pre-wrap rounded-xl border border-amber-200 bg-white p-4 text-sm text-gray-800">
            {testOut}
          </div>
        )}
      </div>
    </div>
  );
}
