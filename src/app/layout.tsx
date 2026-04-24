import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nowtools.kr - AI/이미지/디자인 툴 디렉토리",
  description: "AI, 이미지, 디자인 관련 유용한 툴들을 한눈에 확인하고 비교해보세요. ChatGPT부터 미드저니까지 모든 AI 툴을 모았습니다.",
  verification: {
    google: "tb29R1F5cG6rb8lUHtNP_Yg8mYwhpejuHq2X-01jMdI",
  },
  other: {
    "naver-site-verification": "5377c9ddabbca8a562b2942393077e162e07dca0",
  },
};

import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
