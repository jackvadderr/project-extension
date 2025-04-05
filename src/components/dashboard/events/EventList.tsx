// src/components/dashboard/events/EventList.tsx
"use client";

import { Checkbox } from '@/components/ui/checkbox';
import { Event } from "@/types/Event";

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  selectedEvents: string[];
  onSelectEvent: (id: string, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
  isAllSelected: boolean;
}

export default function EventList({
                                    events,
                                    onEdit,
                                    selectedEvents,
                                    onSelectEvent,
                                    onSelectAll,
                                    isAllSelected
                                  }: EventListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={onSelectAll}
            />
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Nome
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Data
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Localização
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Ações
          </th>
        </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {events.map((event) => (
          <tr key={event.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <Checkbox
                checked={selectedEvents.includes(event.id)}
                onCheckedChange={(checked) =>
                  onSelectEvent(event.id, checked as boolean)
                }
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{event.name}</div>
              <div className="text-sm text-gray-500">{event.event_type}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{new Date(event.date).toLocaleDateString()}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {event.location}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(event.status)}`}>
                  {event.status === 'completed' ? 'Concluído' :
                    event.status === 'canceled' ? 'Cancelado' : 'Agendado'}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                onClick={() => onEdit(event)}
                className="text-blue-600 hover:text-blue-900 mr-3"
              >
                Editar
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
