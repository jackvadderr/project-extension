// src/components/dashboard/events/EventDetails.tsx
import { Event } from "@/types/Event";
import { Customer } from "@/types/Customer";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface EventDetailsProps {
  event: Event;
  client?: Customer;
}

export function EventDetails({ event, client }: EventDetailsProps) {
  const formatDateTime = (date: string) => {
    const dateObj = new Date(date);
    return format(dateObj, "PPpp", { locale: ptBR });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <tr>
      <td colSpan={6} className="px-6 py-4">
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700">Detalhes do Evento</h4>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Descrição:</span> {event.description || 'Não informada'}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Data e Hora:</span> {formatDateTime(event.date)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Duração:</span> {event.duration || 0} horas
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Local:</span> {event.location}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Capacidade Máxima:</span> {event.max_capacity} pessoas
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Tipo de Evento:</span> {event.event_type}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Valor:</span> {formatCurrency(event.rent || 0)}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700">Informações do Cliente</h4>
              {client ? (
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Nome:</span> {client.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">CPF:</span> {client.cpf}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> {client.email || 'Não informado'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Telefone:</span> {client.phone || 'Não informado'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Endereço:</span> {client.address || 'Não informado'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Status:</span> {client.status === 'active' ? 'Ativo' : 'Inativo'}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-600 mt-2">Cliente não encontrado</p>
              )}
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}