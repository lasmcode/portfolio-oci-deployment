
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { APP_CONFIG } from "@/utils/constantsServer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_CONFIG.SITE_TITLE,
  description: APP_CONFIG.SITE_DESCRIPTION,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white min-h-screen flex flex-col`} style={{ backgroundColor: '#0f172a' }}>
        <Navigation />
        <main
          className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ backgroundColor: '#0f172a' }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
