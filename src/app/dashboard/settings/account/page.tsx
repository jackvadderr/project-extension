import ProfileForm from '@/components/dashboard/settings/ProfileForm';

export default function SettingsPage() {
  return (
    <div className="flex w-full h-full bg-gray-100 p-4 rounded-md">
      <div className="flex-1 ml-6 bg-white p-6 rounded-md shadow-sm">
        <ProfileForm />
      </div>
    </div>
  );
}
