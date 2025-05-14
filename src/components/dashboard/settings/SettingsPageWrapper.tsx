'use client';

import ProfileForm from '@/components/dashboard/settings/ProfileForm'
import { Prisma } from '@prisma/client';

interface SettingsPageWrapperProps {
  userId: string;
  getUser: any;
  updateUser: any;
}

export default function SettingsPageWrapper({ userId, getUser, updateUser }: SettingsPageWrapperProps) {
  const handleGetUser = async (id: string) => {
    return await getUser(id);
  };

  const handleSubmit = async (data: Partial<Prisma.UserUpdateInput>) => {
    return await updateUser(userId, data);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Configurações de usuário</h1>
      <ProfileForm
        userId={userId}
        getUser={handleGetUser}
        onSubmit={handleSubmit}
      />
    </div>
  );
}