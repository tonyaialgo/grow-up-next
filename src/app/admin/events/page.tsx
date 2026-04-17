"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Dialog } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { CalendarEvent, EventInput } from "@/types";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

const EMPTY_FORM: EventInput = {
  date: "",
  title: "",
  level: "",
  description: null,
  urgent: false,
};

export default function EventsPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CalendarEvent | null>(null);
  const [form, setForm] = useState<EventInput>(EMPTY_FORM);
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<CalendarEvent | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const filtered = events.filter((e) => {
    const matchSearch = !search || e.title.includes(search);
    const matchLevel = !filterLevel || e.level === filterLevel;
    return matchSearch && matchLevel;
  });

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (event: CalendarEvent) => {
    setEditing(event);
    setForm({
      date: event.date,
      title: event.title,
      level: event.level,
      description: event.description,
      urgent: event.urgent,
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.date || !form.title || !form.level) {
      setFormError("請填寫所有必填欄位");
      return;
    }
    setFormSaving(true);
    setFormError("");
    try {
      const url = editing ? `/api/events/${editing.id}` : "/api/events";
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
      fetchEvents();
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
      await fetch(`/api/events/${deleteTarget.id}`, { method: "DELETE" });
      setDeleteTarget(null);
      fetchEvents();
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">日曆活動</h1>
          <p className="text-gray-500 mt-1">共 {events.length} 個活動</p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4" />
          新增活動
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
              placeholder="搜尋活動標題..."
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
            <option value="P1">小一</option>
            <option value="P6">小六</option>
            <option value="S1">中一</option>
            <option value="S6">中六</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 font-semibold text-gray-600">日期</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">標題</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">階段</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">緊急</th>
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
                  <td colSpan={5} className="text-center py-12 text-gray-400">暫無活動資料</td>
                </tr>
              ) : (
                filtered.map((event) => (
                  <tr key={event.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-medium">{formatDate(event.date)}</td>
                    <td className="px-6 py-4 text-gray-600">{event.title}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                        {event.level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {event.urgent ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
                          <AlertCircle className="w-3 h-3" />
                          緊急
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(event)} className="p-2 rounded-lg hover:bg-primary-50 text-gray-400 hover:text-primary-600 transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteTarget(event)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "編輯活動" : "新增活動"} size="md">
        <div className="space-y-4">
          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {formError}
            </div>
          )}
          <Input
            id="date"
            type="date"
            label="日期"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <Input
            id="title"
            label="標題"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="請輸入活動標題"
          />
          <Select
            id="level"
            label="適用階段"
            value={form.level || ""}
            onChange={(e) => setForm({ ...form, level: e.target.value })}
            options={[
              { value: "", label: "請選擇" },
              { value: "ALL", label: "全部" },
              { value: "P1", label: "小一" },
              { value: "P2", label: "小二" },
              { value: "P3", label: "小三" },
              { value: "P4", label: "小四" },
              { value: "P5", label: "小五" },
              { value: "P6", label: "小六" },
              { value: "S1", label: "中一" },
              { value: "S2", label: "中二" },
              { value: "S3", label: "中三" },
              { value: "S4", label: "中四" },
              { value: "S5", label: "中五" },
              { value: "S6", label: "中六" },
            ]}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">描述</label>
            <textarea
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value || null })}
              placeholder="請輸入活動描述..."
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all resize-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="urgent"
              checked={form.urgent}
              onChange={(e) => setForm({ ...form, urgent: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="urgent" className="text-sm font-medium text-gray-700">標記為緊急</label>
          </div>
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
        title="刪除活動"
        message={`確定要刪除「${deleteTarget?.title}」嗎？此操作無法撤銷。`}
        confirmLabel="刪除"
        danger
      />
    </div>
  );
}
