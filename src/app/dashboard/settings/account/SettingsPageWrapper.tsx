'use client';

import ProfileForm from '@/components/dashboard/settings/ProfileForm'
import { Prisma, User } from '@prisma/client';

interface SettingsPageWrapperProps {
  userId: string;
  getUser: (id: string) => Promise<User | null>;
  updateUser: (id: string, data: Partial<Prisma.UserUpdateInput>) => Promise<User | null>;
}

type FormData = {
  name: string;
  username?: string;
  status?: string;
  about?: string;
};

export default function SettingsPageWrapper({ userId, getUser, updateUser }: SettingsPageWrapperProps) {
  const handleSubmit = async (formData: FormData) => {
    return updateUser(userId, formData);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Configuracoes de usuario</h1>
      <ProfileForm
        userId={userId}
        getUser={getUser}
        onSubmit={handleSubmit}
      />
    </div>
  );
}