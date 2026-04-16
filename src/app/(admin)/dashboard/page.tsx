"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Calendar, Lightbulb, BookOpen, Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Stats {
  totalSchools: number;
  totalEvents: number;
  totalTips: number;
  totalGuides: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ totalSchools: 0, totalEvents: 0, totalTips: 0, totalGuides: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

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
