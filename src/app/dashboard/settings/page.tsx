import { redirect } from 'next/navigation';

const SettingsPage = () => {
  redirect("/dashboard/settings/account");
};

export default SettingsPage;