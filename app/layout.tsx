import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "暖爪宠物洗护店",
  description: "暖爪为猫咪和狗狗提供一对一低压洗护、修剪造型和 SPA 护理服务。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
