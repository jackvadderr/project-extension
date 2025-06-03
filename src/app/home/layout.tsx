import { ReactNode } from "react";
import { APP_NAME, COPYRIGHT_YEAR } from "@/constants/constants";
import { auth } from "@/lib/auth";
import { MdEmail, MdWhatsapp } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { Header } from '@/components/home/Header';


interface LayoutProps {
  children: ReactNode;
}



const TopBar = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-white px-6 py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm border-b shadow-sm">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 justify-center sm:justify-start">
        <a href="https://wa.me/5500000000000" className="flex items-center gap-2 hover:text-blue-700 transition">
          <MdWhatsapp size={16} className="text-green-600" />
          <span>(00) 00000-0000</span>
        </a>
        <a href="mailto:contato@exemplo.com" className="flex items-center gap-2 hover:text-blue-700 transition">
          <MdEmail size={16} className="text-red-500" />
          <span>contato@exemplo.com</span>
        </a>
      </div>

      <div className="flex items-center gap-4 justify-center mt-2 sm:mt-0">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition text-pink-600">
          <FaInstagram />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition text-blue-600">
          <FaFacebookF />
        </a>
        <a href="https://maps.app.goo.gl/JEFsHWWEjUbRWZL6A" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition text-green-600">
          <SiGooglemaps />
        </a>
      </div>
    </div>
  );
};

const Layout = async ({ children }: LayoutProps) => {
  const session = await auth();

  return (
    <>
      <TopBar />
      <Header session={session} />
      <main className="flex-grow w-full px-6 sm:px-10 md:px-16">
        {children}
      </main>
      <Footer />
    </>
  );
};

const Footer = () => (
  <footer className="bg-[#1E3A8A] px-4 py-6 text-white text-center text-sm font-medium shadow-inner">
    <p>&copy; {COPYRIGHT_YEAR} {APP_NAME}. Todos os direitos reservados.</p>
  </footer>
);

export default Layout;
