import React from 'react';
import SidebarProfile from '@/components/dashboard/settings/SidebarProfile';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <SidebarProfile />
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
