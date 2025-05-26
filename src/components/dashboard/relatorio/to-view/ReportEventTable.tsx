import { ListOrdered } from 'lucide-react';

interface Event {
  date: string;
  type: string;
  client: string;
  value: number;
}

export default function ReportEventsTable({ events }: { events: Event[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <ListOrdered className="w-5 h-5" />
        Tabela de Eventos Realizados
      </h2>

      <div className="overflow-hidden border border-gray-300 rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2 border-b">Data</th>
            <th className="text-left p-2 border-b">Tipo</th>
            <th className="text-left p-2 border-b">Cliente</th>
            <th className="text-right p-2 border-b">Valor (R$)</th>
          </tr>
          </thead>
          <tbody>
          {events.map((event, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{new Date(event.date).toLocaleDateString('pt-BR')}</td>
              <td className="p-2">{event.type}</td>
              <td className="p-2">{event.client}</td>
              <td className="p-2 text-right">{event.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
