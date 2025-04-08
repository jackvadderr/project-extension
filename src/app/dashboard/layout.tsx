import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import Sidebar from "@/components/layout/Sidebar";
import { SignOut } from "@/components/sign-out";
import { COPYRIGHT_YEAR, APP_NAME } from "@/constants/constants";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <p className="text-gray-600">Você precisa estar logado para acessar o dashboard.</p>
        <a href="/sign-in">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Login</button>
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
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
    <header className="bg-[#1c3681] p-4 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm w-full">
      <h1 className="text-lg font-semibold text-center md:text-left flex-1">
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full md:w-auto">
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
