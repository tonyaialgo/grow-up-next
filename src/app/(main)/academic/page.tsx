import MainLayout from "@/components/MainLayout";
import { GraduationCap, Calendar, BookOpen, Search } from "lucide-react";

export default function AcademicPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900">升學及學力導航</h1>
                <p className="text-gray-600 mt-1">助你為孩子選擇最適合的學校</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* School Database */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">香港學校數據庫</h3>
                <p className="text-gray-600 mb-4">收錄全港中小學資料，包含Banding、校風、入學要求等資訊</p>
                <div className="space-y-2">
                  {["按地區搜尋", "按Banding篩選", "學校比較功能"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Calendar */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">升學日曆</h3>
                <p className="text-gray-600 mb-4">自動提醒各校開放日、報名截止日期</p>
                <div className="space-y-2">
                  {["小一自行分配學位", "中一自行分配學位", "學校開放日預告"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-accent-400 rounded-full" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Study Tips */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">學業小貼士</h3>
                <p className="text-gray-600 mb-4">涵蓋不同階段的學習方法、校內外比賽資訊</p>
                <div className="space-y-2">
                  {["小學階段攻略", "升中適應技巧", "課外活動建議"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
