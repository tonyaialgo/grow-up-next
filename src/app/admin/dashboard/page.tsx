"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Calendar, Lightbulb, BookOpen, RefreshCw, CheckCircle, XCircle, Loader2, Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Stats {
  totalSchools: number;
  totalEvents: number;
  totalTips: number;
  totalGuides: number;
}

interface SyncLog {
  id: number;
  status: string;
  total_records: number | null;
  removed_records: number | null;
  error_message: string | null;
  started_at: string;
  completed_at: string | null;
  elapsed_seconds: number | null;
  created_at: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ totalSchools: 0, totalEvents: 0, totalTips: 0, totalGuides: 0 });
  const [loading, setLoading] = useState(true);
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success: boolean; message: string } | null>(null);

  const fetchStats = async () => {
    try {
      const [schools, events, tips, guides] = await Promise.all([
        fetch("/api/schools").then((r) => r.json()),
        fetch("/api/events").then((r) => r.json()),
        fetch("/api/tips").then((r) => r.json()),
        fetch("/api/guides").then((r) => r.json()),
      ]);

      setStats({
        totalSchools: Array.isArray(schools) ? schools.length : 0,
        totalEvents: Array.isArray(events) ? events.length : 0,
        totalTips: Array.isArray(tips) ? tips.length : 0,
        totalGuides: Array.isArray(guides) ? guides.length : 0,
      });
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const fetchSyncLogs = async () => {
    try {
      const res = await fetch("/api/schools/sync");
      const data = await res.json();
      if (data.logs) setSyncLogs(data.logs);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchStats();
    fetchSyncLogs();
  }, []);

  const handleSync = async () => {
    if (!confirm("即將從教育局 data.gov.hk API 同步學校資料。現有學校的資料會更新，新學校會加入，已停辦的學校會標記為停辦。是否繼續？")) return;
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch("/api/schools/sync", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setSyncResult({ success: true, message: data.message || `同步成功！共 ${data.total} 間學校` });
        fetchStats();
        fetchSyncLogs();
      } else {
        setSyncResult({ success: false, message: data.error || "同步失敗" });
        fetchSyncLogs();
      }
    } catch {
      setSyncResult({ success: false, message: "網絡錯誤，請稍後再試" });
    } finally {
      setSyncing(false);
    }
  };

  const statCards = [
    { label: "學校數目", value: stats.totalSchools, icon: GraduationCap, color: "primary", href: "/admin/schools" },
    { label: "日曆活動", value: stats.totalEvents, icon: Calendar, color: "accent", href: "/admin/events" },
    { label: "學習技巧", value: stats.totalTips, icon: Lightbulb, color: "primary", href: "/admin/tips" },
    { label: "升學指南", value: stats.totalGuides, icon: BookOpen, color: "accent", href: "/admin/guides" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-gray-900">主控台</h1>
        <p className="text-gray-500 mt-1">歡迎回來，管理員</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className={cn(
                "bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:scale-105 transition-all",
                card.color === "primary"
                  ? "hover:border-primary-200"
                  : "hover:border-accent-200"
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                  card.color === "primary" ? "bg-primary-100" : "bg-accent-100"
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6",
                    card.color === "primary" ? "text-primary-600" : "text-accent-600"
                  )}
                />
              </div>
              <p className="text-3xl font-black text-gray-900">
                {loading ? "-" : card.value}
              </p>
              <p className="text-gray-500 text-sm mt-1">{card.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Data Sync */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">📡 數據同步</h2>
            <p className="text-gray-500 text-sm mt-1">從教育局 data.gov.hk 自動更新學校資料</p>
          </div>
          <button
            onClick={handleSync}
            disabled={syncing}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all",
              "bg-primary-600 text-white hover:bg-primary-700",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              syncing && "animate-pulse"
            )}
          >
            {syncing ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> 同步中...</>
            ) : (
              <><RefreshCw className="w-4 h-4" /> 同步學校資料</>
            )}
          </button>
        </div>

        {/* Latest result */}
        {syncResult && (
          <div className={cn(
            "flex items-center gap-2 p-4 rounded-xl text-sm font-medium mb-4",
            syncResult.success ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
          )}>
            {syncResult.success ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <XCircle className="w-4 h-4 flex-shrink-0" />}
            {syncResult.message}
          </div>
        )}

        {/* Sync history */}
        {syncLogs.length > 0 ? (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" /> 同步歷史
            </h3>
            <div className="space-y-2">
              {syncLogs.slice(0, 5).map((log) => {
                const startDate = new Date(log.started_at);
                const dateStr = startDate.toLocaleDateString("zh-HK", { month: "short", day: "numeric" });
                const timeStr = startDate.toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit" });
                const isSuccess = log.status === "success";

                return (
                  <div key={log.id} className={cn(
                    "flex items-center gap-3 p-3 rounded-xl text-sm",
                    isSuccess ? "bg-emerald-50" : "bg-red-50"
                  )}>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      isSuccess ? "bg-emerald-100" : "bg-red-100"
                    )}>
                      {isSuccess
                        ? <CheckCircle className="w-4 h-4 text-emerald-600" />
                        : <AlertTriangle className="w-4 h-4 text-red-600" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{dateStr} {timeStr}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-xs font-semibold",
                          isSuccess ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                        )}>
                          {isSuccess ? "成功" : "失敗"}
                        </span>
                      </div>
                      <div className="text-gray-500 text-xs mt-0.5">
                        {isSuccess
                          ? `${log.total_records} 間學校${log.removed_records ? ` · ${log.removed_records} 間停辦` : ""}${log.elapsed_seconds ? ` · ${log.elapsed_seconds}s` : ""}`
                          : log.error_message || "未知錯誤"
                        }
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">暫無同步記錄</p>
        )}

        <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
          <span>資料來源：教育局學校註冊資料（每日更新）</span>
          <span>每日凌晨 3:00 自動同步</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">快速新增</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "新增學校", href: "/admin/schools", icon: GraduationCap },
            { label: "新增活動", href: "/admin/events", icon: Calendar },
            { label: "新增技巧", href: "/admin/tips", icon: Lightbulb },
            { label: "新增指南", href: "/admin/guides", icon: BookOpen },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 hover:text-primary-700 transition-all text-gray-700 font-medium text-sm"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
