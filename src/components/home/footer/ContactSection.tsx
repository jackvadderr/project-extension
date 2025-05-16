import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

interface ContactSectionProps {
  id?: string
}

const ContactSection = ({ id }: ContactSectionProps) => {
  return (
    <section id={id} className="bg-gray-900 text-white py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Pronto para celebrar?</h1>
        <p className="text-gray-300 mt-2">Deixe suas dúvidas aqui e garanta sua data especial.</p>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        <div className="w-full md:w-1/2">
          <div className="text-white space-y-4">
            <h2 className="text-2xl font-bold">Contato</h2>
            <p>📱 69 9 9999-9999</p>
            <p>📧 raeventos@raeventos.com.br</p>
            <p>📍 Porto Velho - RO</p>
          </div>
          <div className="flex space-x-4 mt-8 text-white">
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaFacebook className="hover:text-pink-500 cursor-pointer" />
            <FaYoutube className="hover:text-pink-500 cursor-pointer" />
          </div>
        </div>
        <div className="w-full md:w-1/2">
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
        </div>
      </div>
    </section>
  );
};

export default ContactSection;