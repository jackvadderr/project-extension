"use client";

import { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { ContactMessage } from "@prisma/client";

interface ContactMessagesWrapperProps {
  getAllMessages: () => Promise<ContactMessage[]>;
}

export default function ContactMessagesWrapper({
                                                 getAllMessages,
                                               }: ContactMessagesWrapperProps) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await getAllMessages();
      setMessages(data);
    } catch (err) {
      console.error("Erro ao carregar mensagens de contato:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Carregando mensagens...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Mensagens de Contato
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Todas as mensagens enviadas pelo formulário público.
        </p>
      </div>

      {messages.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          Nenhuma mensagem de contato encontrada.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mensagem
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data de Envio
              </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {msg.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {msg.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <div className="max-w-xs truncate">{msg.message}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(msg.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
