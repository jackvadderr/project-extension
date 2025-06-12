// components/home/footer/ContactSectionWrapper.tsx
"use client";

import { useState } from "react";
import { ContactMessage } from "@prisma/client";
import ContactSection from '@/components/home/footer/ContactSection';

export interface CreateContactMessageInput {
  name: string;
  email: string;
  message: string;
}

type CreateContactActionFn = (
  data: CreateContactMessageInput
) => Promise<ContactMessage>;

interface ContactSectionWrapperProps {
  id?: string;
  createContactAction: CreateContactActionFn;
}

export default function ContactSectionWrapper({
                                                id,
                                                createContactAction, // agora vem por props
                                              }: ContactSectionWrapperProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Invoca a função recebida por props
      await createContactAction({ name, email, message });

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      console.error("Erro ao enviar mensagem de contato:", err);
      setError("Ocorreu um erro ao enviar. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ContactSection
        id={id}
        name={name}
        email={email}
        message={message}
        loading={loading}
        onNameChange={(e) => setName(e.target.value)}
        onEmailChange={(e) => setEmail(e.target.value)}
        onMessageChange={(e) => setMessage(e.target.value)}
        onSubmit={handleSubmit}
      />

      <div className="max-w-2xl mx-auto mt-4 px-6 md:px-16">
        {error && (
          <p className="text-red-400 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-400 text-center">
            Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.
          </p>
        )}
      </div>
    </>
  );
}
