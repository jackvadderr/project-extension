'use client';

import Link from "next/link";
import { APP_NAME } from "@/constants/constants";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { LogIn } from "lucide-react";

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
        offsetY: 80,
      },
      ease: "power2.inOut",
    });
  }
};

export const Header = ({ session }: { session: SessionType }) => {
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    scrollToElement(id.replace('#', ''));
  };

  return (
    <header className="flex justify-between items-center px-6 sm:px-10 py-6 bg-white shadow-md border-b">
      {/* Logo e título */}
      <div className="flex items-center gap-3">
        <img
          src="/android-chrome-512x512.png"
          alt="Logo"
          className="h-10 w-10 object-contain"
        />
        <span className="text-2xl font-bold text-gray-800">{APP_NAME}</span>
      </div>

      {/* Menu de navegação */}
      <nav className="hidden md:flex flex-4 justify-center gap-6 text-base font-medium text-gray-700">
        <Link href="/home" className="hover:text-blue-700 focus:outline-none focus:text-blue-700"
        >
          Início
        </Link>
        <a
          href="#about"
          onClick={(e) => handleSmoothScroll(e, "about")}
          className="hover:text-blue-700 transition-colors cursor-pointer"
        >
          Sobre
        </a>
        <a
          href="#contact"
          onClick={(e) => handleSmoothScroll(e, "contact")}
          className="hover:text-blue-700 transition-colors cursor-pointer"
        >
          Contato
        </a>
      </nav>

      {/* Botão login ou dashboard */}
      <div>
        {!session ? (
          <Link href="/sign-in">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition-all">
              <LogIn size={18} />
              <span>Login</span>
            </button>
          </Link>
        ) : (
          <Link href="/dashboard">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition-all">
              <span>Painel</span>
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};
