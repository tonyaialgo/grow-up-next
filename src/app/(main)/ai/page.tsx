import MainLayout from "@/components/MainLayout";
import Link from "next/link";
import { Bot, GraduationCap, Heart, Sparkles } from "lucide-react";

const cards = [
  {
    href: "/ai/academic-advisor",
    title: "AI 升學顧問",
    desc: "依孩子背景與平台學校資料生成升學建議",
    icon: GraduationCap,
    gradient: "from-indigo-500 to-violet-600",
  },
  {
    href: "/ai/parent-support",
    title: "家長支援",
    desc: "育兒問答與情緒支援（非治療）",
    icon: Heart,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    href: "/ai/assistant",
    title: "全站助手",
    desc: "問平台功能、內容與頁面導航",
    icon: Bot,
    gradient: "from-cyan-500 to-blue-600",
  },
];

export default function AiHubPage() {
  return (
    <MainLayout>
      <section className="min-h-screen bg-gradient-to-b from-violet-50 to-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-800">
            <Sparkles className="h-4 w-4" />
            GrowUp AI
          </div>
          <h1 className="mb-3 text-4xl font-black text-gray-900 md:text-5xl">
            智能成長助手
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-medium text-gray-600">
            升學規劃、家長支援與站內導航。使用前請詳閱私隱政策；免費用戶設有每日使用上限。
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 px-4 sm:grid-cols-1 md:grid-cols-3 md:px-6 lg:px-8">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.href}
                href={c.href}
                className="group rounded-3xl border-2 border-white bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div
                  className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${c.gradient} text-white shadow-lg`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h2 className="mb-2 text-xl font-black text-gray-900 group-hover:text-violet-700">
                  {c.title}
                </h2>
                <p className="text-sm font-medium text-gray-600">{c.desc}</p>
              </Link>
            );
          })}
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-xs text-gray-400">
          「AI 健康評估」報告頁內可另開「AI 成長報告解讀」。
        </p>
      </section>
    </MainLayout>
  );
}
