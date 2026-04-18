"use client";

import MainLayout from "@/components/MainLayout";

export default function Loading() {
  return (
    <MainLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-600">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <div className="mx-auto h-14 w-80 max-w-full animate-pulse rounded-2xl bg-white/20" />
            <div className="mx-auto mt-4 h-6 w-96 max-w-full animate-pulse rounded-xl bg-white/15" />
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="h-16 animate-pulse rounded-2xl border border-white/20 bg-white/15" />
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="h-10 w-32 animate-pulse rounded-full bg-white/15" />
              <div className="h-4 w-20 animate-pulse rounded bg-white/15" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-blue-50/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border-2 border-blue-100 bg-white shadow-xl"
              >
                <div className="h-48 animate-pulse bg-gradient-to-br from-blue-400/60 to-indigo-500/60" />
                <div className="space-y-4 p-6">
                  <div className="h-6 w-2/3 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-1/3 animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-1/4 animate-pulse rounded bg-gray-100" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 animate-pulse rounded-lg bg-blue-100" />
                    <div className="h-6 w-20 animate-pulse rounded-lg bg-blue-100" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-4/6 animate-pulse rounded bg-gray-100" />
                  </div>
                  <div className="h-12 w-full animate-pulse rounded-xl bg-gradient-to-r from-blue-200 to-indigo-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
