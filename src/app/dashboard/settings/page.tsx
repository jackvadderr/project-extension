import ProfileForm from '@/components/dashboard/settings/ProfileForm';
import { redirect } from 'next/navigation';

const SettingsPage = () => {
  redirect("/dashboard/settings/account");
};

export default SettingsPage;