'use client';

import Link from "next/link";
import { APP_NAME } from "@/constants/constants";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

interface SessionType {
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
}

const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: {
        y: element,
        offsetY: 80
      },
      ease: "power2.inOut"
    });
  }
};

export const Header = ({ session }: { session: SessionType }) => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToElement(id.replace('#', ''));
  };

  return (
    <header className="flex justify-between items-center px-8 py-8 bg-white shadow-xl border-b">
      <div className="flex items-center gap-2">
        <img src="/android-chrome-512x512.png" alt="Logo" className="h-10 w-auto" />
        <div className="text-2xl font-bold">{APP_NAME}</div>
      </div>

      <nav className="flex gap-6">
        <Link href="/home" className="text-gray-700 no-underline hover:text-pink-500 transition-colors">Inicio</Link>
        <a href="#about" className="text-gray-700 no-underline hover:text-pink-500 transition-colors" onClick={(e) => handleSmoothScroll(e, 'about')}>Sobre</a>
        <a href="#contact" className="text-gray-700 no-underline hover:text-pink-500 transition-colors" onClick={(e) => handleSmoothScroll(e, 'contact')}>Contato</a>
      </nav>

      {!session ? (
        <Link href="/sign-in">
          <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
            Login
          </button>
        </Link>
      ) : (
        <Link href="/dashboard">
          <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
            Dashboard
          </button>
        </Link>
      )}
    </header>
  );
};