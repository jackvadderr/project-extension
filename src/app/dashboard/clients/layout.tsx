import type { ReactNode } from 'react';

interface CustomersLayoutProps {
  children: ReactNode;
}

export default function CustomersLayout({ children }: CustomersLayoutProps) {
  return (
    <div className="min-h-screen bg-[#eef2f6] rounded-2xl">
      <h1 className="text-2xl font-bold p-6 text-gray-800">Gerenciar Clientes</h1>
      {children}
    </div>
  );
}
