import MainLayout from "@/components/MainLayout";

export default function AssessmentPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-primary-200 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
              <span>AI 驅動，專業可靠</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              AI 生長評估
            </h1>
            <p className="text-gray-600 text-lg">
              根據香港衛生署生長圖表，分析孩子身高體重發育情況
            </p>
          </div>
        </section>

        {/* Assessment Form */}
        <section className="py-12 bg-white">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <p className="text-center text-gray-500 mb-8">
                請前往家長登入使用 AI 評估功能
              </p>
              <div className="text-center">
                <a
                  href="/assessment"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-xl font-semibold text-sm"
                >
                  前往評估頁面
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
