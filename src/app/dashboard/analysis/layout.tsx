import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Preparar Relatório',
  description: 'Etapa de preparação antes de gerar o relatório final',
};

export default function Layout({ children }: LayoutProps) {
  return <div className="w-full min-h-screen bg-gray-50 p-8">{children}</div>;
}
