import { ListOrdered } from 'lucide-react';

interface Event {
  date: string;
  type: string;
  client: string;
  value: number;
}

const mockEvents: Event[] = [
  { date: '2025-05-01', type: 'Casamento', client: 'Ana Lima', value: 8000 },
  { date: '2025-05-05', type: 'Corporativo', client: 'Empresa XPTO', value: 12000 },
  { date: '2025-05-10', type: 'Aniversário', client: 'Carlos Souza', value: 5000 },
  { date: '2025-05-12', type: 'Workshop', client: 'Instituto Saber', value: 6500 },
  { date: '2025-05-18', type: 'Casamento', client: 'Maria Oliveira', value: 10000 },
];

export default function ReportEventsTable() {
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
          {mockEvents.map((event, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{new Date(event.date).toLocaleDateString('pt-BR')}</td>
              <td className="p-2">{event.type}</td>
              <td className="p-2">{event.client}</td>
              <td className="p-2 text-right">{event.value.toLocaleString('pt-BR')}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
