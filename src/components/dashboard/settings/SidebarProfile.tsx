'use client';

import { useState } from 'react';
import { Cog6ToothIcon, KeyIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { IoIosNotifications } from "react-icons/io";

const sidebarItems = [
  {
    icon: Cog6ToothIcon,
    label: 'Conta',
    path: '/dashboard/settings/account'
  },
  {
    icon: KeyIcon,
    label: 'Controle de Acesso',
    path: '/dashboard/settings/access'
  },
  {
    icon: IoIosNotifications,
    label: 'Notificacoes e mensagens',
    path: '/dashboard/settings/notifications'
  },
];

export default function SidebarProfile() {
  const router = useRouter();
  const [active, setActive] = useState('Account');

  const handleNavigation = (label: string, path: string) => {
    setActive(label);
    router.push(path);
  };

  return (
    <div className="w-64 bg-white p-4 rounded-md shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      <ul>
        {sidebarItems.map(({ icon: Icon, label, path }) => (
          <li
            key={label}
            onClick={() => handleNavigation(label, path)}
            className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md ${
              active === label ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}