import Link from "next/link";
import { auth } from "@/lib/auth";
import { APP_NAME, COPYRIGHT_YEAR } from "@/constants/constants";

const Page = async () => {
  const session = await auth();

  return (
    <>
      <Header session={session} />
      <main className="flex-grow p-4 flex items-center justify-center w-full">
        <div className="bg-gray-100 rounded-lg p-4 text-center w-full">
          <p className="text-gray-600">Bem vindo! Aqui vai ficar as fotos dos bagulhos la.</p>
        </div>
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
      {!session ? (
        <Link href="/sign-in">
          <button className="bg-white text-blue-500 px-4 py-2 rounded">Login</button>
        </Link>
      ) : (
        <div className="flex items-center">
          {/* <p className="mr-4">Logado como: {session.user?.email}</p> */}
          <Link href="/dashboard">
            <button className="bg-white text-blue-500 px-4 py-2 rounded">Dashboard</button>
          </Link>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="bg-blue-500 p-4 text-white text-center w-full">
    <p>&copy; {COPYRIGHT_YEAR} {APP_NAME}. Todos os direitos reservados.</p>
  </footer>
);

const Logo = () => (
  <h1 className="text-xl font-bold">{APP_NAME}</h1>
);

const NavLinks = () => (
  <nav>
    <ul className="flex space-x-4">
      <li><Link href="/home" className="hover:underline">Inicio</Link></li>
      <li><Link href="/about" className="hover:underline">Sobre</Link></li>
      <li><Link href="/contact" className="hover:underline">Contato</Link></li>
    </ul>
  </nav>
);

export default Page;