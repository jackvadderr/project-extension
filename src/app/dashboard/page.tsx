import Link from "next/link";
import { auth } from "@/lib/auth";
import { Sign } from "crypto";
import { SignOut } from "@/components/sign-out";

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Você precisa estar logado para acessar o dashboard.</p>
        <Link href="/sign-in">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Header session={session} />
      <main className="flex-grow p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Bem vindo ao seu dashboard!</p>
      </main>
      <Footer />
    </>
  );
};

const Header = ({ session }) => {
  return (
    <header className="bg-blue-500 p-4 text-white flex justify-between items-center border-b w-full">
      <div className="flex items-center">
        <Logo />
      </div>
      <NavLinks />
      <div className="flex items-center">
        <p className="mr-4">Logado como: {session.user?.email}</p>
        <SignOut />
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-blue-500 p-4 text-white text-center w-full">
    <p>&copy; 2025 Minha Aplicação. Todos os direitos reservados.</p>
  </footer>
);

const Logo = () => (
  <h1 className="text-xl font-bold">Minha Aplicação</h1>
);

const NavLinks = () => (
  <nav>
    <ul className="flex space-x-4">
      <li><Link href="/dashboard" className="hover:underline">Dashboard</Link></li>
      <li><Link href="/dashboard/settings" className="hover:underline">Configurações</Link></li>
      <li><Link href="/dashboard/profile" className="hover:underline">Perfil</Link></li>
    </ul>
  </nav>
);

export default DashboardPage;