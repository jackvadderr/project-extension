// components/SocialIcons.tsx
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const SocialIcons = () => {
  return (
    <div className="flex space-x-4 mt-8 text-white">
      <FaInstagram className="hover:text-pink-500 cursor-pointer" />
      <FaFacebook className="hover:text-pink-500 cursor-pointer" />
      <FaYoutube className="hover:text-pink-500 cursor-pointer" />
    </div>
  );
};

export default SocialIcons;
