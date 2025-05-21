import type { ReactNode } from 'react';

interface AnalysisLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Relatorio de Eventos',
  description: 'Relatorio detalhado de eventos',
}

export default function AnalysisReportLayout({ children }: AnalysisLayoutProps) {

  return (
    <div className="w-[800px] mx-auto p-8 relative">
      {children}
    </div>
    );
  // <div className="min-h-screen bg-gray-100 rounded-2xl">{children}</div>;
}