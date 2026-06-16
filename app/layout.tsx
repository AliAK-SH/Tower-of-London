import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Persian Font (Vazirmatn)
const vazir = localFont({
  src: [
    {
      path: "../public/fonts/vazirmatn/Vazirmatn-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/vazirmatn/Vazirmatn-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-vazir",
  display: "swap",
});

// English Font (Bona Nova)
const bonaNova = localFont({
  src: [
    {
      path: "../public/fonts/bona-nova/BonaNova-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/bona-nova/BonaNova-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bona-nova",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tower of London",
  description: "Cognitive Psychology Test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazir.variable} ${bonaNova.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
