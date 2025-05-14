'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Prisma, User } from '@prisma/client';

interface ProfileFormProps {
  userId: string;
  getUser: (id: string) => Promise<User | null>;
  onSubmit: (data: Partial<Prisma.UserUpdateInput>) => Promise<User | null>;
}

type FormData = {
  name: string;
  email: string;
};

export default function ProfileForm({ userId, getUser, onSubmit }: ProfileFormProps) {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: ''
  });
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    async function load() {
      const u = await getUser(userId);
      if (u) {
        setUser(u);
        setFormData({
          name: u.name || '',
          email: u.email || ''
        });
        setIsChanged(false);
      }
    }
    load();
  }, [userId, getUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsChanged(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChanged) return;

    const updated = await onSubmit(formData);
    if (updated) {
      setUser(updated);
      setIsChanged(false);
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
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Mudar foto de perfil
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
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

      <button
        type="submit"
        disabled={!isChanged}
        className={`mt-4 px-4 py-2 rounded-md ${
          isChanged
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-700 cursor-not-allowed'
        }`}
      >
        Save changes
      </button>
    </form>
  );
}