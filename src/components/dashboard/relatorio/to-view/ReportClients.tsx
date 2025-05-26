import { Users2 } from 'lucide-react';

interface Client {
  name: string;
  recurrence: number;
  source: string;
  revenue: number;
}

export default function ReportClients({ clients }: { clients: Client[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Users2 className="w-5 h-5" />
        Clientes
      </h2>

      <div className="overflow-hidden border border-gray-300 rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2 border-b">Nome</th>
            <th className="text-left p-2 border-b">Recorrência</th>
            {/*<th className="text-left p-2 border-b">Origem</th>*/}
            <th className="text-right p-2 border-b">Faturamento (R$)</th>
          </tr>
          </thead>
          <tbody>
          {clients.map((client, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{client.name}</td>
              <td className="p-2">{client.recurrence}</td>
              {/*<td className="p-2">{client.source}</td>*/}
              <td className="p-2 text-right">
                {client.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
