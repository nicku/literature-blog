import type { Metadata } from "next";
import {
  Frank_Ruhl_Libre,
  Fraunces,
  Geist,
  Geist_Mono,
} from "next/font/google";
import Sidebar from "./Sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const titleLatin = Fraunces({
  variable: "--font-title-latin",
  subsets: ["latin"],
  weight: ["700"],
});

const titleHebrew = Frank_Ruhl_Libre({
  variable: "--font-title-hebrew",
  subsets: ["hebrew", "latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Literature Blog",
  description: "A blog about literature",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${titleLatin.variable} ${titleHebrew.variable} antialiased min-h-screen text-foreground`}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 min-w-0 py-8 px-4 sm:px-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
