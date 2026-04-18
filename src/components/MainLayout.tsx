"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Heart, Brain, BarChart3, Menu, X, Home, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "主頁", icon: Home },
  { href: "/academic", label: "升學導航", icon: GraduationCap },
  { href: "/health", label: "健康中心", icon: Heart },
  { href: "/wellbeing", label: "心靈成長", icon: Brain },
  { href: "/assessment", label: "AI評估", icon: BarChart3 },
  { href: "/ai", label: "AI 助手", icon: Sparkles },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ═══════════════════ COLORFUL HEADER ═══════════════════ */}
      <header className="relative overflow-hidden">
        {/* Gradient background matching current section */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 -z-10" />
        
        <div className="relative z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-pink-500">G</span>
                </div>
                <div>
                  <span className="text-xl font-black text-white">Grow Up</span>
                  <p className="text-xs text-white/70">K-12 全人成長導航</p>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
                        isActive
                          ? "bg-white text-indigo-600 shadow-lg"
                          : "text-white/90 hover:bg-white/20 hover:text-white"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Admin Link */}
              <Link
                href="/admin/login"
                className="hidden md:inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/30 transition-all border border-white/30"
              >
                👨‍💼 管理員
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg bg-white/20 text-white"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div className="md:hidden border-t border-white/20 bg-white/10 backdrop-blur-md px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold",
                      isActive
                        ? "bg-white text-indigo-600"
                        : "text-white/90 hover:bg-white/20"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/admin/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/90 hover:bg-white/20"
              >
                👨‍💼 管理員登入
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* ═══════════════════ MAIN CONTENT ═══════════════════ */}
      <main className="flex-1">{children}</main>

      {/* ═══════════════════ COLORFUL FOOTER ═══════════════════ */}
      <footer className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-pink-500">G</span>
                </div>
                <div>
                  <span className="text-xl font-black">Grow Up</span>
                  <p className="text-xs text-white/70">K-12 全人成長導航平台</p>
                </div>
              </div>
              <p className="text-white/80 max-w-sm font-medium">
                數據驅動成長，守護每個可能。我們致力為香港家長提供最專業、最全面的育兒支援。
              </p>
              <div className="flex gap-3 mt-4">
                {["📚", "❤️", "🧠", "⭐"].map((e) => (
                  <span key={e} className="text-2xl">{e}</span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-black mb-4 text-lg">主要功能</h4>
              <ul className="space-y-2 text-white/80 font-medium">
                {[
                  { href: "/academic", label: "升學導航" },
                  { href: "/health", label: "健康中心" },
                  { href: "/wellbeing", label: "心靈成長" },
                  { href: "/assessment", label: "AI評估" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white transition-colors">
                      → {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-4 text-lg">聯絡我們</h4>
              <ul className="space-y-2 text-white/80 font-medium">
                <li>📧 hello@growup.hk</li>
                <li>📞 +852 1234 5678</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/70 font-medium">
              © 2026 Grow Up · 數據驅動成長，守護每個可能 🌟
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
