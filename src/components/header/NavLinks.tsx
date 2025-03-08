// components/NavLinks.tsx
const NavLinks = () => {
    const links = ["Contato", "Fotos", "Extras"];
  
    return (
      <nav>
        <ul className="flex space-x-6">
          {links.map((link) => (
            <li key={link}>
              <a href="#" className="font-medium hover:underline">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default NavLinks;
  