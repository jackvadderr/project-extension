import { BarChart3, DollarSign, User } from 'lucide-react';

interface FinancialData {
  totalRevenue: number;
  averageTicket: number;
  topClients: { name: string; value: number }[];
}

export default function ReportFinancials({ data }: { data: FinancialData }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5" /> Financeiro
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            Receita Total
          </div>
          <div className="text-lg font-bold">R$ {data.totalRevenue.toLocaleString('pt-BR')}</div>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <User className="w-4 h-4" />
            Ticket Médio
          </div>
          <div className="text-lg font-bold">R$ {data.averageTicket.toLocaleString('pt-BR')}</div>
        </div>
      </div>

      {/*Top Clientes*/}
      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">Top Clientes</h3>
        <ul>
          {data.topClients.map((client, idx) => (
            <li key={idx} className="flex justify-between text-sm border-b py-1">
              <span>{client.name}</span>
              <span>R$ {client.value.toLocaleString('pt-BR')}</span>
            </li>
          ))}
        </ul>
      </div>

      {/*Distribuicao visual*/}
      <div>
        <h3 className="text-md font-medium mb-2">Distribuição Visual</h3>
        <div className="space-y-2">
          {data.topClients.map((client, idx) => {
            const total = data.totalRevenue;
            const percentage = (client.value / total) * 100;
            return (
              <div key={idx}>
                <div className="text-xs text-gray-700 mb-1">{client.name} — {percentage.toFixed(1)}%</div>
                <div className="w-full h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-blue-600 rounded"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
