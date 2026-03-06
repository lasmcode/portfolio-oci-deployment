import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { APP_CONFIG } from "@/utils/constantsServer";


const inter = Inter({ variable: "--font-geist-sans", subsets: ["latin"] });

const spaceGrotesk = Space_Grotesk({ variable: "--font-headings", subsets: ["latin"], weight: ['700'] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_CONFIG.SITE_TITLE,
  description: APP_CONFIG.SITE_DESCRIPTION,
  icons: {
    icon: { url: '/icon.svg', type: 'image/svg+xml' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} antialiased bg-slate-950 text-white min-h-screen flex flex-col`} style={{ backgroundColor: '#0f172a' }}>
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