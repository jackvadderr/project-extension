interface SearchBarProps {
    placeholder: string;
  }
  
  const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
    return (
      <input
        type="text"
        className="border rounded-lg p-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
    );
  };
  
  export default SearchBar;
  