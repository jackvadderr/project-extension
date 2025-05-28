import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ReactNode } from "react";
import { APP_NAME } from "@/constants/constants";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Empresa de organizacao de eventos.",
};

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="pt-BR">
    <head>
      <link rel="icon" href="/favicon.ico" />
    </head>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
    >
    <div className="min-h-screen w-full flex flex-col">
      {children}
    </div>
    <Toaster position="top-center" richColors />
    </body>
    </html>
  );
};

export default Layout;
