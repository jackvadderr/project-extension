interface AddEventButtonProps {
  onClick: () => void;
}

const AddEventButton: React.FC<AddEventButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2  rounded-xl shadow hover:bg-blue-600 transition"
    >
      + Adicionar Evento
    </button>
  );
};

export default AddEventButton;
