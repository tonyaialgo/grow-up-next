"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Heart, Brain, BarChart3, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "主頁", icon: BarChart3 },
  { href: "/academic", label: "升學導航", icon: GraduationCap },
  { href: "/health", label: "健康中心", icon: Heart },
  { href: "/wellbeing", label: "心靈成長", icon: Brain },
  { href: "/assessment", label: "AI評估", icon: BarChart3 },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">G</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">Grow Up</span>
                <p className="text-xs text-gray-500">K-12 全人成長導航平台</p>
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
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
              className="hidden md:inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
            >
              管理員登入
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
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
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium",
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600"
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
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500"
            >
              管理員登入
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-lg">G</span>
                </div>
                <div>
                  <span className="text-xl font-bold">Grow Up</span>
                  <p className="text-xs text-gray-400">K-12 全人成長導航平台</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm max-w-sm">
                數據驅動成長，守護每個可能。我們致力為香港家長提供最專業、最全面的育兒支援。
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">主要功能</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/academic" className="hover:text-white transition-colors">升學導航</Link></li>
                <li><Link href="/health" className="hover:text-white transition-colors">健康中心</Link></li>
                <li><Link href="/wellbeing" className="hover:text-white transition-colors">心靈成長</Link></li>
                <li><Link href="/assessment" className="hover:text-white transition-colors">AI評估</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">聯絡我們</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>電郵：hello@growup.hk</li>
                <li>電話：+852 1234 5678</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            © 2026 Grow Up. 數據驅動成長，守護每個可能。
          </div>
        </div>
      </footer>
    </div>
  );
}
