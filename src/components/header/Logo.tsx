// components/Logo.tsx
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center">
      {/* <Image src="/logo.svg" alt="Logo" width={24} height={24} /> */}
      <span className="ml-2 font-bold text-lg">Nome da empresa krlh</span>
    </div>
  );
};

export default Logo;
