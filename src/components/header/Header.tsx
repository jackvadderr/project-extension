import AuthButtons from "@/components/header/AuthButtons";
import NavLinks from "@/components/header/NavLinks";
import Logo from "@/components/header/Logo";


const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center">
        <Logo />
      </div>
      <NavLinks />
      <AuthButtons />
    </header>
  );
};

export default Header;