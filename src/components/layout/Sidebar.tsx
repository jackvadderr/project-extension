"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Calendar, DollarSign, Settings, Menu, X } from "lucide-react";
import { APP_NAME } from "@/constants/constants";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Função para fechar o Drawer
  const closeDrawer = () => setIsOpen(false);

  // Função para navegar e fechar o Drawer
  const handleNavigation = (href: string) => {
    closeDrawer(); // Fecha o Drawer antes de mudar de página
    setTimeout(() => router.push(href), 200); // Adiciona um pequeno delay na navegação
  };

  return (
    <>
      {/* Botão para abrir o Drawer */}
      {!isOpen && ( // Exibe o botão apenas quando o Drawer estiver fechado
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md shadow-md hover:bg-gray-100 transition"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Drawer com animação */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Fundo escuro com fade-in */}
            <motion.div
              className="fixed inset-0 bg-gray-500/75 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer} // Fecha ao clicar no fundo
            />

            {/* Menu lateral deslizante */}
            <motion.div
              className="fixed left-0 top-0 w-64 h-screen bg-white shadow-md z-20 flex flex-col p-5"
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

              <h2 className="text-xl font-bold mb-6  text-center">{APP_NAME}</h2>

              <nav className="flex flex-col gap-4">
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <Home size={20} /> Dashboard
                </button>
                <button
                  onClick={() => handleNavigation("/dashboard/analysis")}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <DollarSign size={20} /> Relatório
                </button>
                <button
                  onClick={() => handleNavigation("/dashboard/events")}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <Calendar size={20} /> Eventos
                </button>
                <button
                  onClick={() => handleNavigation("/dashboard/clients")}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <DollarSign size={20} /> Clientes
                </button>
              </nav>

              <div className="mt-auto">
                <button
                  onClick={() => handleNavigation("/dashboard/settings")}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <Settings size={20} /> Configurações
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
