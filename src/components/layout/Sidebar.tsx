"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FileBarChart,
  CalendarCheck,
  UserRound,
  SlidersHorizontal,
  Menu,
  X,
} from "lucide-react";
import { APP_NAME } from "@/constants/constants";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const closeDrawer = () => setIsOpen(false);
  const handleNavigation = (href: string) => {
    closeDrawer();
    setTimeout(() => router.push(href), 200);
  };

  return (
    <>
      {/* Botão para abrir o Drawer */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-4 left-4 z-20 p-2 bg-blue-900 text-white rounded-xl shadow-md hover:bg-blue-800 transition-all border border-white/20"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Drawer com animação */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Fundo escuro com fade-in */}
            <motion.div
              className="fixed inset-0 bg-gray-500/60 backdrop-blur-sm z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            />

            {/* Menu lateral deslizante */}
            <motion.div
              className="fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 shadow-xl z-40 flex flex-col p-6 rounded-tr-2xl rounded-br-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* Botão de fechar */}
              <button
                onClick={closeDrawer}
                className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-4 mb-10 px-1 mt-2">
                <div className="bg-blue-100 p-1 rounded-xl shadow">
                  <Image
                    src="/R.A.png"
                    alt="Logo RA Eventos"
                    width={50}
                    height={50}
                    className="rounded-full ring-1 ring-blue-300 p-1 bg-white"
                  />
                </div>
                <span className="text-xl font-bold tracking-tight text-blue-900">
                  {APP_NAME}
                </span>
              </div>

              <nav className="flex flex-col gap-4">
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                >
                  <LayoutDashboard size={20} /> Dashboard
                </button>
                <button
                  onClick={() => handleNavigation("/dashboard/analysis")}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                >
                  <FileBarChart size={20} /> Relatório
                </button>
                <button
                  onClick={() => handleNavigation("/dashboard/events")}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                >
                  <CalendarCheck size={20} /> Eventos
                </button>
                <button
                  onClick={() => handleNavigation("/dashboard/clients")}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                >
                  <UserRound size={20} /> Clientes
                </button>
              </nav>

              <div className="mt-auto">
                <button
                  onClick={() => handleNavigation("/dashboard/settings")}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                >
                  <SlidersHorizontal size={20} /> Configurações
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Drawer;
