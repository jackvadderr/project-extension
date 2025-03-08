// components/AuthButtons.tsx
const AuthButtons = () => {
    return (
      <div className="flex space-x-3">
        <button className="flex items-center border px-4 py-2 rounded-lg">
          <span>🔓</span> {/* Ícone Simbólico */}
          <span className="ml-2">Login</span>
        </button>
        <button className="px-4 py-2 bg-black text-white rounded-lg">
          Signup
        </button>
      </div>
    );
  };
  
  export default AuthButtons;
  