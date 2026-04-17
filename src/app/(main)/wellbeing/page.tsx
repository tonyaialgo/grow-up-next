import MainLayout from "@/components/MainLayout";
import { Brain, Heart, Compass, Users, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Heart,
    title: "心理發展",
    desc: "社交技巧訓練、情緒監管、友誼建立",
    gradient: "from-pink-500 to-rose-600",
    iconColor: "text-pink-500",
    emoji: "💜",
    highlights: ["情商訓練", "情緒管理", "社交技巧"],
  },
  {
    icon: Compass,
    title: "青春期導航",
    desc: "面對生理變化、第二性徵發育的心理調適",
    gradient: "from-orange-500 to-amber-600",
    iconColor: "text-orange-500",
    emoji: "🌟",
    highlights: ["生理變化適應", "心理調適指南", "家長溝通技巧"],
  },
  {
    icon: Users,
    title: "未來素養",
    desc: "財商教育、數碼公民教育、批判性思考",
    gradient: "from-violet-500 to-purple-600",
    iconColor: "text-violet-500",
    emoji: "🚀",
    highlights: ["理財教育", "數碼素養", "批判思維"],
  },
  {
    icon: Brain,
    title: "社交技巧",
    desc: "社交恐懼克服、建立健康人際關係",
    gradient: "from-cyan-500 to-teal-600",
    iconColor: "text-cyan-500",
    emoji: "🤝",
    highlights: ["自信建立", "溝通技巧", "人際關係"],
  },
];

export default function WellbeingPage() {
  return (
    <MainLayout>
      {/* ═══════════════════════════════════════════ HERO ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-violet-600 to-purple-700">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />
          <div className="absolute top-40 -left-32 w-[500px] h-[500px] bg-pink-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 right-20 w-80 h-80 bg-violet-300/30 rounded-full blur-3xl" />
          {/* Floating emojis */}
          <div className="absolute top-16 left-[5%] animate-float text-4xl opacity-70">🧠</div>
          <div className="absolute top-24 right-[10%] animate-float-delayed text-3xl opacity-60">💜</div>
          <div className="absolute top-40 left-[15%] animate-float-delayed-2 text-3xl opacity-50">✨</div>
          <div className="absolute bottom-32 left-[8%] animate-float text-4xl opacity-70">🌟</div>
          <div className="absolute bottom-24 right-[12%] animate-float-delayed text-3xl opacity-60">💪</div>
          <div className="absolute top-1/3 right-[20%] animate-float-delayed-2 text-2xl opacity-50">🎯</div>
        </div>

        {/* Hero content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-xl">
                <Brain className="w-4 h-4 text-pink-300" />
                身心健康同等重要
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                心靈與
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-yellow-200">
                  軟技能 🌟
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-10 leading-relaxed font-medium">
                心理發展 · 青春期導航 · 未來素養
                <br />陪伴孩子全面成長 ✨
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/wellbeing"
                  className="group inline-flex items-center gap-3 bg-white text-pink-600 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
                >
                  <Brain className="w-6 h-6" />
                  探索成長
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right visual */}
            <div className="relative hidden lg:flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-violet-400 rounded-full opacity-40 blur-3xl" />
                <div className="absolute inset-8 bg-white/95 backdrop-blur rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-500 via-violet-500 to-purple-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
                    <span className="text-6xl">🧠</span>
                  </div>
                  <div className="text-2xl font-black text-gray-800 mb-1">心靈成長</div>
                  <div className="text-sm text-gray-500 font-medium">由內而外</div>
                </div>
                <div className="absolute -top-2 left-4 bg-white rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "3s" }}>
                  <span className="text-3xl">💜</span>
                </div>
                <div className="absolute top-10 -right-4 bg-pink-100 rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "4s", animationDelay: "1s" }}>
                  <span className="text-3xl">🌟</span>
                </div>
                <div className="absolute -bottom-2 left-12 bg-violet-100 rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
                  <span className="text-3xl">✨</span>
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
      <section className="py-20 bg-gradient-to-b from-white to-pink-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              🌈 四大成長領域
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              培育完整人格
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              除了學業成績，我們更關心孩子的內心世界
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-pink-100 overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-br ${item.gradient}`} />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl" />

                  <div className="relative mb-6 mt-6">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-10 h-10 ${item.iconColor}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 text-4xl animate-bounce-gentle">{item.emoji}</div>
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-6 font-medium">{item.desc}</p>

                  <ul className="space-y-3">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-3 text-gray-700 font-medium">
                        <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
