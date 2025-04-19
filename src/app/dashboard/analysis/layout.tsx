import type { ReactNode } from 'react';

interface AnalysisLayoutProps {
  children: ReactNode;
}

export default function AnalysisReportLayout({ children }: AnalysisLayoutProps) {
  return <div className="min-h-screen bg-gray-100 rounded-2xl">{children}</div>;
}