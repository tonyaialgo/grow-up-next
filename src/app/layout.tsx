import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grow Up - K-12 全人成長導航平台",
  description: "數據驅動成長，守護每個可能",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-HK">
      <body className="antialiased">{children}</body>
    </html>
  );
}
