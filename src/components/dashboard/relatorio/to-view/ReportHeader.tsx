import { CalendarIcon } from 'lucide-react';

interface ReportHeaderProps {
  adminName: string;
  period: string;
}

export default function ReportHeader({ adminName, period }: ReportHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Relatório de Eventos</h1>
          <p className="text-sm text-gray-600">Período: {period}</p>
          <p className="text-sm text-gray-600">Administrador: {adminName}</p>
        </div>
        <div>
          <CalendarIcon className="w-12 h-12 text-gray-500" />
        </div>
      </div>
    </div>
  );
}
