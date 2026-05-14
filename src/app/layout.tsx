import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nowtools.kr'),
  title: "nowtools.kr - AI/이미지/디자인 툴 디렉토리",
  description: "AI, 이미지, 디자인 관련 유용한 툴들을 한눈에 확인하고 비교해보세요. ChatGPT부터 미드저니까지 모든 AI 툴을 모았습니다.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "nowtools.kr - AI/이미지/디자인 툴 디렉토리",
    description: "AI, 이미지, 디자인 관련 유용한 툴들을 한눈에 확인하고 비교해보세요. ChatGPT부터 미드저니까지 모든 AI 툴을 모았습니다.",
    url: "https://nowtools.kr",
    locale: "ko_KR",
    type: "website",
  },
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
      <head>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2926379867432785" 
          crossOrigin="anonymous" 
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M5KGN4VZ');`,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M5KGN4VZ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <Footer />
      </body>
    </html>
  );
}
