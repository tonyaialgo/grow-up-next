import MainLayout from "@/components/MainLayout";
import { Brain, Heart, Compass, Users } from "lucide-react";

export default function WellbeingPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900">心靈與軟技能</h1>
                <p className="text-gray-600 mt-1">陪伴孩子身心健康成長</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Heart,
                  title: "心理發展",
                  desc: "社交技巧訓練、情緒監管、友誼建立",
                  color: "primary",
                },
                {
                  icon: Compass,
                  title: "青春期導航",
                  desc: "面對生理變化、第二性徵發育的心理調適",
                  color: "accent",
                },
                {
                  icon: Users,
                  title: "未來素養",
                  desc: "財商教育、數碼公民教育、批判性思考",
                  color: "primary",
                },
                {
                  icon: Brain,
                  title: "社交技巧",
                  desc: "社交恐懼克服、建立健康人際關係",
                  color: "accent",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      item.color === "primary" ? "bg-primary-100" : "bg-accent-100"
                    }`}>
                      <Icon className={`w-6 h-6 ${item.color === "primary" ? "text-primary-600" : "text-accent-600"}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
