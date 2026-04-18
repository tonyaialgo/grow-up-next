"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Row = {
  feature_key: string;
  name: string;
  is_active: boolean;
  updated_at: string;
};

export default function AdminPromptsListPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_token")
      : null;

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/ai/prompts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setRows(data);
      setLoading(false);
    })();
  }, [token]);

  if (loading) {
    return <div className="text-gray-500">載入中…</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">AI 提示詞</h1>
        <p className="text-sm text-gray-500">選擇功能以編輯系統提示與版本紀錄</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-bold">功能</th>
              <th className="px-4 py-3 font-bold">鍵值</th>
              <th className="px-4 py-3 font-bold">更新</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.feature_key} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-500">
                  {r.feature_key}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {r.updated_at?.slice(0, 10)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/ai/prompts/${r.feature_key}`}
                    className="font-bold text-primary-600 hover:underline"
                  >
                    編輯
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
