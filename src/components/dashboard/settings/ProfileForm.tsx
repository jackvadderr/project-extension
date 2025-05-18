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
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16">
          <Image
            src={user?.image || '/avatar.svg'}
            alt="Profile Picture"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex gap-2">
          <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Mudar foto de perfil
          </button>
          <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-md">
            Apagar foto de perfil
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Nome de usuario
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          disabled
          className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-100"
        />
      </div>

      <div className="border-t mt-6 pt-6">
        <h3 className="text-lg font-medium mb-4">Alterar senha</h3>

        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium">
            Senha atual
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="newPassword" className="block text-sm font-medium">
            Nova senha
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium">
            Confirmar nova senha
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {passwordError && <p className="mt-2 text-sm text-red-600">{passwordError}</p>}
      </div>

      <button
        type="submit"
        disabled={!isChanged}
        className={`mt-4 px-4 py-2 rounded-md ${
          isChanged
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-700 cursor-not-allowed'
        }`}
      >
        Salvar alterações
      </button>
    </form>
  );
}