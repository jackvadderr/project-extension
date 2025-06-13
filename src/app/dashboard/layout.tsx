import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { SignOut } from "@/components/sign-out";
import { COPYRIGHT_YEAR, APP_NAME } from "@/constants/constants";
import { getUserAction } from '@/actions/systemUser/get-user-action';
import Drawer from "@/components/layout/Sidebar";


interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <p className="text-gray-600">Você precisa estar logado para acessar o dashboard.</p>
        <a href="/sign-in">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Login</button>
        </a>
      </div>
    );
  }

  const user = await getUserAction(userId);
  const isAdmin = user?.role === 'ADMIN';

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <p>Acesso restrito. Entre em contato com o administrador para mais informações.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <Header session={session} />
        <main className="flex-grow p-6 bg-gray-50">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

const Header = ({ session }: { session: any }) => {
  return (
    <header className="bg-[#1c3681] p-4 text-white flex items-center justify-between gap-4 shadow-sm w-full">
      {/* Botão do Drawer à esquerda */}
      <Drawer />

      {/* Email + Botão Sair à direita */}
      {/*<div className="flex justify-center">*/}
      <div className="ml-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        <p className="text-xs sm:text-sm text-blue-100 opacity-90 text-center sm:text-left break-words">
          {session.user?.email}
        </p>
        <SignOut className="bg-[#2c3575] hover:bg-[#1c3681] px-4 py-1.5 rounded-full text-xs font-medium shadow-sm border border-[#4367b6]" />
      </div>
    </header>
  );
};


const Footer = () => (
  <footer className="bg-[#1c3681] p-3 text-white text-center w-full text-xs">
    <p>&copy; {COPYRIGHT_YEAR} {APP_NAME}. Todos os direitos reservados.</p>
  </footer>
);

export default DashboardLayout;
