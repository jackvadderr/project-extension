export default function SearchBar() {
  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-lg flex items-center gap-4">
      <input placeholder="Location" className="p-2 rounded bg-white text-black" />
      <input placeholder="Property Type" className="p-2 rounded bg-white text-black" />
      <input placeholder="Price Range" className="p-2 rounded bg-white text-black" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
    </div>
  );
}
