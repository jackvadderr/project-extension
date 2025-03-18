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
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header session={session} />
        <main className="flex-grow p-4 bg-gray-50">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

const Header = ({ session }: { session: any }) => {
  return (
    <header className="bg-blue-500 p-4 text-white flex flex-col md:flex-row justify-between items-center border-b w-full">
      {/* <Button className="mb-2 md:mb-0">Criar evento</Button> */}
        <h1 className="text-2xl font-bold"></h1>
      <div className="flex items-center">
        <p className="mr-4 text-sm md:text-base">Logado como: {session.user?.email}</p>
        <SignOut />
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-blue-500 p-4 text-white text-center w-full">
    <p>&copy; {COPYRIGHT_YEAR} {APP_NAME}. Todos os direitos reservados.</p>
  </footer>
);

export default DashboardLayout;
