export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <div className="text-2xl font-bold">🏠 Dwelling</div>
      <nav className="flex gap-6">
        {['Home', 'Properties', 'Agents', 'About Us', 'Contact Us'].map(item => (
          <a key={item} className="hover:underline">{item}</a>
        ))}
      </nav>
      <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">Register</button>
    </header>
  );
}
