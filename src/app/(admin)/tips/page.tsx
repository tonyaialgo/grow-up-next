"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Search, ChevronDown, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Dialog } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { StudyTip, TipInput } from "@/types";
import { cn } from "@/lib/utils";

const EMPTY_FORM: TipInput = {
  title: "",
  description: null,
  level: null,
  icon: "Lightbulb",
  color: "primary",
  items: [],
};

const LEVEL_OPTIONS = [
  { value: "", label: "請選擇" },
  { value: "ALL", label: "全部" },
  { value: "P", label: "小學" },
  { value: "S", label: "中學" },
];

export default function TipsPage() {
  const [tips, setTips] = useState<StudyTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<StudyTip | null>(null);
  const [form, setForm] = useState<TipInput>(EMPTY_FORM);
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<StudyTip | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchTips = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tips");
      const data = await res.json();
      setTips(Array.isArray(data) ? data : []);
    } catch {
      setTips([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTips();
  }, [fetchTips]);

  const filtered = tips.filter((t) => {
    const matchSearch = !search || t.title.includes(search);
    const matchLevel = !filterLevel || t.level === filterLevel;
    return matchSearch && matchLevel;
  });

  const levelLabel = (level: string | null) => {
    if (level === "ALL") return "全部";
    if (level === "P") return "小學";
    if (level === "S") return "中學";
    return level || "-";
  };

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (tip: StudyTip) => {
    setEditing(tip);
    setForm({
      title: tip.title,
      description: tip.description,
      level: tip.level,
      icon: tip.icon || "Lightbulb",
      color: tip.color || "primary",
      items: tip.items || [],
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title) {
      setFormError("請填寫標題");
      return;
    }
    setFormSaving(true);
    setFormError("");
    try {
      const url = editing ? `/api/tips/${editing.id}` : "/api/tips";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "儲存失敗");
        return;
      }
      setModalOpen(false);
      fetchTips();
    } catch {
      setFormError("網絡錯誤");
    } finally {
      setFormSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await fetch(`/api/tips/${deleteTarget.id}`, { method: "DELETE" });
      setDeleteTarget(null);
      fetchTips();
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">學習技巧</h1>
          <p className="text-gray-500 mt-1">共 {tips.length} 項技巧</p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4" />
          新增技巧
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜尋標題..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
          >
            <option value="">所有階段</option>
            <option value="ALL">全部</option>
            <option value="P">小學</option>
            <option value="S">中學</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-4 font-semibold text-gray-600 w-10"></th>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">標題</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">階段</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">項目</th>
              <th className="text-right px-6 py-4 font-semibold text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400">載入中...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400">暫無技巧資料</td>
              </tr>
            ) : (
              filtered.map((tip) => (
                <>
                  <tr key={tip.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setExpanded(expanded === tip.id ? null : tip.id)}
                        className="p-1 rounded hover:bg-gray-100 text-gray-400 transition-colors"
                      >
                        <ChevronDown className={cn("w-4 h-4 transition-transform", expanded === tip.id && "rotate-180")} />
                      </button>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{tip.title}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-semibold",
                        tip.level === "ALL" ? "bg-primary-100 text-primary-700" :
                        tip.level === "P" ? "bg-accent-100 text-accent-700" :
                        "bg-gray-100 text-gray-600"
                      )}>
                        {levelLabel(tip.level)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {tip.items?.length || 0} 項
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(tip)} className="p-2 rounded-lg hover:bg-primary-50 text-gray-400 hover:text-primary-600 transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteTarget(tip)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Expanded items */}
                  {expanded === tip.id && tip.items && tip.items.length > 0 && (
                    <tr key={`${tip.id}-expanded`} className="bg-gray-50">
                      <td colSpan={5} className="px-12 py-3">
                        <ul className="space-y-1">
                          {tip.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "編輯技巧" : "新增技巧"} size="md">
        <div className="space-y-4">
          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {formError}
            </div>
          )}
          <Input
            id="title"
            label="標題"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="請輸入技巧標題"
          />
          <Select
            id="level"
            label="適用階段"
            value={form.level || ""}
            onChange={(e) => setForm({ ...form, level: (e.target.value as any) || null })}
            options={LEVEL_OPTIONS}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">描述</label>
            <textarea
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value || null })}
              placeholder="請輸入描述..."
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all resize-none"
            />
          </div>
          <Input
            id="items"
            label="項目（多個以逗號分隔）"
            value={(form.items || []).join(", ")}
            onChange={(e) =>
              setForm({ ...form, items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
            }
            placeholder="例如：多做練習, 預習新課, 溫習筆記"
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>取消</Button>
            <Button onClick={handleSave} disabled={formSaving}>
              {formSaving ? "儲存中..." : "儲存"}
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="刪除技巧"
        message={`確定要刪除「${deleteTarget?.title}」嗎？此操作無法撤銷。`}
        confirmLabel="刪除"
        danger
      />
    </div>
  );
}
