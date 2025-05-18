import { getUserAction } from '@/actions/systemUser/get-user-action';
import { updateUserAction } from '@/actions/systemUser/update-user-action';
import SettingsPageWrapper from '@/components/dashboard/settings/SettingsPageWrapper';
import { auth } from '@/lib/auth';
import { verifyPasswordAction } from '@/actions/systemUser/verify-password-action';
import { hashPasswordAction } from '@/actions/systemUser/hashPasswordAction';


export default async function SettingsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="flex w-full h-full bg-gray-100 p-4 rounded-md">
      <div className="flex-1 ml-6 bg-white p-6 rounded-md shadow-sm">
        <SettingsPageWrapper
          userId={userId}
          getUser={getUserAction}
          updateUser={updateUserAction}
          verifyPassword={verifyPasswordAction}
          hashPassword={hashPasswordAction}
        />
      </div>
    </div>
  );
}