// components/ContactForm.tsx
const ContactForm = () => {
  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Nome"
        className="w-full p-2 rounded bg-gray-100 focus:outline-none"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 rounded bg-gray-100 focus:outline-none"
      />
      <textarea
        placeholder="Mensagem"
        className="w-full p-2 rounded bg-gray-100 focus:outline-none"
        rows={4}
      ></textarea>
      <button
        type="submit"
        className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition"
      >
        ENVIAR
      </button>
    </form>
  );
};

export default ContactForm;
