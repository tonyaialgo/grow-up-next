import MainLayout from "@/components/MainLayout";
import { Heart, Brain, Activity, Shield, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Activity,
    title: "AI 健康評估",
    desc: "根據香港衛生署生長圖表，輸入身高體重即可獲得專業評估",
    gradient: "from-cyan-500 to-emerald-500",
    iconColor: "text-cyan-500",
    emoji: "🤖",
    highlights: ["對標衛生署生長圖表", "智能生長警報", "個人化建議"],
  },
  {
    icon: Brain,
    title: "健康百科",
    desc: "兒童營養、睡眠科學、生長議題專業資訊",
    gradient: "from-emerald-500 to-teal-500",
    iconColor: "text-emerald-500",
    emoji: "📖",
    highlights: ["專業資訊審核", "家長指南", "健康食譜"],
  },
  {
    icon: Heart,
    title: "生長曲線追蹤",
    desc: "記錄孩子身高體重，畫出連續生長走勢圖",
    gradient: "from-pink-500 to-rose-500",
    iconColor: "text-pink-500",
    emoji: "📈",
    highlights: ["圖表化追蹤", "歷史記錄", "對比同齡孩子"],
  },
  {
    icon: Shield,
    title: "智能警報",
    desc: "當生長低於第3百分位時自動提醒家長",
    gradient: "from-orange-500 to-amber-500",
    iconColor: "text-orange-500",
    emoji: "🚨",
    highlights: ["及早發現問題", "及時就醫建議", "專家諮詢"],
  },
];

export default function HealthPage() {
  return (
    <MainLayout>
      {/* ═══════════════════════════════════════════ HERO ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-cyan-600 to-blue-600">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />
          <div className="absolute top-40 -left-32 w-[500px] h-[500px] bg-green-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 right-20 w-80 h-80 bg-cyan-300/30 rounded-full blur-3xl" />
          {/* Floating emojis */}
          <div className="absolute top-16 left-[5%] animate-float text-4xl opacity-70">❤️</div>
          <div className="absolute top-24 right-[10%] animate-float-delayed text-3xl opacity-60">💪</div>
          <div className="absolute top-40 left-[15%] animate-float-delayed-2 text-3xl opacity-50">🤱</div>
          <div className="absolute bottom-32 left-[8%] animate-float text-4xl opacity-70">🧬</div>
          <div className="absolute bottom-24 right-[12%] animate-float-delayed text-3xl opacity-60">🌱</div>
          <div className="absolute top-1/3 right-[20%] animate-float-delayed-2 text-2xl opacity-50">✨</div>
        </div>

        {/* Hero content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-xl">
                <Heart className="w-4 h-4 text-rose-300" />
                關注孩子健康
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                全方位
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-cyan-200 to-emerald-200">
                  健康中心 ❤️
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-10 leading-relaxed font-medium">
                AI 健康評估 · 生長追蹤 · 專業健康資訊
                <br />陪伴孩子健康成長每一步 👶
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/assessment"
                  className="group inline-flex items-center gap-3 bg-white text-emerald-600 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
                >
                  <Activity className="w-6 h-6" />
                  AI 健康評估
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right visual */}
            <div className="relative hidden lg:flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-full opacity-40 blur-3xl" />
                <div className="absolute inset-8 bg-white/95 backdrop-blur rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
                    <span className="text-6xl">❤️</span>
                  </div>
                  <div className="text-2xl font-black text-gray-800 mb-1">健康成長</div>
                  <div className="text-sm text-gray-500 font-medium">由 AI 守護</div>
                </div>
                <div className="absolute -top-2 left-4 bg-white rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "3s" }}>
                  <span className="text-3xl">🤖</span>
                </div>
                <div className="absolute top-10 -right-4 bg-cyan-100 rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "4s", animationDelay: "1s" }}>
                  <span className="text-3xl">📊</span>
                </div>
                <div className="absolute -bottom-2 left-12 bg-green-100 rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
                  <span className="text-3xl">📈</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative h-16">
          <svg className="absolute bottom-0 w-full h-16 text-white" viewBox="0 0 1440 64" fill="none" preserveAspectRatio="none">
            <path d="M0 64L60 58.7C120 53 240 43 360 37.3C480 32 600 32 720 42.7C840 53 960 75 1080 74.7C1200 75 1320 53 1380 32.7L1440 32V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V64Z" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ FEATURES ═══════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-white to-cyan-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              🏥 四大健康功能
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              科技守護健康
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              先進 AI 技術 + 專業醫學數據，為孩子成長把關
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-cyan-100 overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${item.gradient}`} />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-2xl" />

                  <div className="relative mb-6 mt-4">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-10 h-10 ${item.iconColor}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 text-3xl animate-bounce-gentle">{item.emoji}</div>
                  </div>

                  <h3 className="text-xl font-black text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-6 font-medium">{item.desc}</p>

                  <ul className="space-y-2">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white px-10 py-6 rounded-3xl shadow-2xl">
              <div className="text-left">
                <p className="text-2xl font-black">立即試用 AI 健康評估</p>
                <p className="text-white/80 font-medium">5秒知道孩子生長狀況</p>
              </div>
              <Link
                href="/assessment"
                className="group inline-flex items-center gap-3 bg-white text-emerald-600 px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                開始評估
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
