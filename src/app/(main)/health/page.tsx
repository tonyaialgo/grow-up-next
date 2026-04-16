import MainLayout from "@/components/MainLayout";
import { Heart, Brain, Activity, Shield } from "lucide-react";
import Link from "next/link";

export default function HealthPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-accent-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900">全方位健康中心</h1>
                <p className="text-gray-600 mt-1">AI 健康評估、生長追蹤、專業健康資訊</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Activity,
                  title: "AI 健康評估",
                  desc: "根據香港衛生署生長圖表，輸入身高體重即可獲得專業評估",
                  color: "primary",
                },
                {
                  icon: Brain,
                  title: "健康百科",
                  desc: "兒童營養、睡眠科學、生長議題專業資訊",
                  color: "accent",
                },
                {
                  icon: Heart,
                  title: "生長曲線追蹤",
                  desc: "記錄孩子身高體重，畫出連續生長走勢圖",
                  color: "primary",
                },
                {
                  icon: Shield,
                  title: "智能警報",
                  desc: "當生長低於第3百分位時自動提醒家長",
                  color: "accent",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      item.color === "primary" ? "bg-primary-100" : "bg-accent-100"
                    }`}>
                      <Icon className={`w-6 h-6 ${item.color === "primary" ? "text-primary-600" : "text-accent-600"}`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/assessment"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                立即試用 AI 健康評估
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
