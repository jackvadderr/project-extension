import type { ReactNode } from 'react';

interface CustomersLayoutProps {
  children: ReactNode;
}

export default function CustomersLayout({ children }: CustomersLayoutProps) {
  return <div className="min-h-screen bg-gray-100 rounded-2xl">{children}</div>;
}
