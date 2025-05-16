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
    <div className="bg-gray-100 py-2 px-8 flex justify-between items-center text-sm border-b">
      <div className="flex items-center gap-6">
        <a href="https://wa.me/5500000000000" className="flex items-center gap-2 hover:text-blue-700">
          <MdWhatsapp size={16} />
          <span>(00) 00000-0000</span>
        </a>
        <a href="mailto:contato@exemplo.com" className="flex items-center gap-2 hover:text-blue-700">
          <MdEmail size={16} />
          <span>contato@exemplo.com</span>
        </a>
      </div>

      <div className="flex items-center gap-4">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
          <FaInstagram />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
          <FaFacebookF />
        </a>
        <a href="https://maps.app.goo.gl/JEFsHWWEjUbRWZL6A" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
          <SiGooglemaps />        </a>
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
      <main className="flex-grow items-center justify-center w-full">
        {children}
      </main>
      <Footer />
    </>
  );
};

const Footer = () => (
  <footer className="bg-[#1E3A8A] p-4 text-white text-center w-full">
    <p>&copy; {COPYRIGHT_YEAR} {APP_NAME}. Todos os direitos reservados.</p>
  </footer>
);

export default Layout;
