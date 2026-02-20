import Script from "next/script";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import CreateReviewModal from "@/components/modal/CreateReviewModal";
import QueryProvider from "@/lib/provider/QueryProvider";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "카츠예스",
  description: "돈까스 맛집을 소개하는 맛집 지도 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4103933024196008`}
        strategy="afterInteractive" // 페이지 로드 후 실행하여 성능 최적화
        crossOrigin="anonymous"
      />
      <body className={`${notoSansKr.variable} antialiased`}>
        <QueryProvider>
          {children}
          <CreateReviewModal />
        </QueryProvider>
      </body>
    </html>
  );
}
