'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Prisma, User } from '@prisma/client';

interface ProfileFormProps {
  userId: string;
  getUser: (id: string) => Promise<User | null>;
  onSubmit: (data: Partial<Prisma.UserUpdateInput>) => Promise<User | null>;
  verifyPassword: (userId: string, currentPassword: string) => Promise<boolean>;
  hashPassword: (plane: string) => Promise<string>;
}

type FormData = {
  name: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export default function ProfileForm({
  userId,
  getUser,
  onSubmit,
  verifyPassword,
  hashPassword,
}: ProfileFormProps) {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isChanged, setIsChanged] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');

  useEffect(() => {
    async function load() {
      const u = await getUser(userId);
      if (u) {
        setUser(u);
        setFormData((prev) => ({
          ...prev,
          name: u.name || '',
          email: u.email || '',
        }));
        setHashedPassword(u.password);
        setIsChanged(false);
      }
    }
    load();
  }, [userId, getUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsChanged(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChanged) return;

    if (formData.newPassword || formData.currentPassword || formData.confirmPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setPasswordError('As senhas não coincidem');
        return;
      }

      try {
        await verifyPassword(userId, formData.currentPassword?.toString());
      } catch {
        setPasswordError('Senha atual incorreta');
        return;
      }
    }

    const dataToUpdate: Partial<Prisma.UserUpdateInput> = {
      name: formData.name,
    };

    if (formData.newPassword) {
      dataToUpdate.password = await hashPassword(formData.newPassword);
    }

    const updated = await onSubmit(dataToUpdate);
    if (updated) {
      setUser(updated);
      setIsChanged(false);
      setFormData((prev) => ({
        ...prev,
        name: updated.name || '',
        email: updated.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      setPasswordError('');
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mx-auto mt-6 max-w-3xl bg-white border border-gray-200 shadow-md rounded-2xl p-10 space-y-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 border-b pb-4 flex items-center gap-2">
        <span className="text-purple-700 text-4xl">👤</span> Configurações da conta
      </h2>

      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 shrink-0">
          <Image
            src={user?.image || '/avatar.svg'}
            alt="Foto de perfil"
            fill
            className="rounded-full object-cover ring-2 ring-gray-300 shadow-sm"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome de usuário</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          disabled
          className="w-full px-4 py-3 border border-gray-200 bg-gray-100 rounded-xl text-gray-500 shadow-sm cursor-not-allowed"
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-orange-500 text-2xl">🔒</span> Alterar senha
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-1">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Senha atual</label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          <div className="col-span-1 md:col-span-1">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">Nova senha</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          <div className="col-span-1 md:col-span-1">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar nova senha</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
        </div>

        {passwordError && (
          <p className="text-sm text-red-600 mt-2">{passwordError}</p>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          disabled={!isChanged}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shadow ${
            isChanged
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          💾 Salvar alterações
        </button>
      </div>

    </form>

  );
}