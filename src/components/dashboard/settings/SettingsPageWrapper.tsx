'use client';

import ProfileForm from '@/components/dashboard/settings/ProfileForm'
import { Prisma, User } from '@prisma/client';
import { hashPasswordAction } from '@/actions/systemUser/hashPasswordAction';

interface SettingsPageWrapperProps {
  userId: string;
  getUser: (id: string) => Promise<User | null>;
  updateUser: (userId: string, data: Partial<Prisma.UserUpdateInput>) => Promise<User | null>;
  verifyPassword: (userId: string, currentPassword: string) => Promise<boolean>;
  hashPassword: (plane: string) => Promise<string>;
}


export default function SettingsPageWrapper({
                                              userId,
                                              getUser,
                                              updateUser,
                                              verifyPassword,
                                              hashPassword,
                                            }: SettingsPageWrapperProps) {
  const handleGetUser = async (id: string) => {
    return await getUser(id);
  };

  const handleSubmit = async (data: Partial<Prisma.UserUpdateInput>) => {
    return await updateUser(userId, data);
  };

  const handleVerifyPassword = async (id: string, currentPassword: string) => {
    const isValid = await verifyPassword(id, currentPassword);
    if (!isValid) {
      throw new Error('Senha atual inválida');
    }
    return true;
  }

  const handlePasswordHash = async (plane: string) => {
    return await hashPassword(plane);
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Configurações de usuário</h1>
      <ProfileForm
        userId={userId}
        getUser={handleGetUser}
        onSubmit={handleSubmit}
        verifyPassword={handleVerifyPassword}
        hashPassword={handlePasswordHash}
      />
    </div>
  );
}