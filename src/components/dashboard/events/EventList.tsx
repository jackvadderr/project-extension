// src/components/dashboard/events/EventList.tsx
"use client";

import { Checkbox } from '@/components/ui/checkbox';
import { Event } from "@/types/Event";
import { EventDetails } from './EventDetails';
import { useEventExpansion } from '@/hooks/useEventExpansion';
import React from 'react';
import { Customer } from '@/types/Customer';

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  selectedEvents: number[];
  onSelectEvent: (id: number, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
  isAllSelected: boolean;
  customers: Customer[];
}

export default function EventList({
                                    events,
                                    onEdit,
                                    selectedEvents,
                                    onSelectEvent,
                                    onSelectAll,
                                    isAllSelected,
                                    customers,
                                  }: EventListProps) {
  const { isEventExpanded, toggleEventExpansion } = useEventExpansion();

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

  const handleRowClick = (event: Event, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button') && !target.closest('input')) {
      toggleEventExpansion(event.id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate" style={{ borderSpacing: '0 0.5rem' }}>
        <thead>
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
        <tbody>
        {events.map((event) => (
          <React.Fragment key={event.id}>
            <tr
              className="group cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={(e) => handleRowClick(event, e)}
            >
              <td className="px-6 py-4 whitespace-nowrap bg-white group-hover:bg-gray-50 first:rounded-l-xl first:border-l first:border-gray-200">
                <Checkbox
                  checked={selectedEvents.includes(event.id)}
                  onCheckedChange={(checked) =>
                    onSelectEvent(event.id, checked as boolean)
                  }
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap bg-white group-hover:bg-gray-50">
                <div className="text-sm font-medium text-gray-900">{event.name}</div>
                <div className="text-sm text-gray-500">{event.event_type}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap bg-white group-hover:bg-gray-50">
                <div className="text-sm text-gray-900">
                  {new Date(event.date).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-white group-hover:bg-gray-50">
                {event.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap bg-white group-hover:bg-gray-50">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(event.status)}`}>
                    {event.status === 'completed' ? 'Concluído' :
                      event.status === 'canceled' ? 'Cancelado' : 'Agendado'}
                  </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-white group-hover:bg-gray-50 last:rounded-r-xl last:border-r last:border-gray-200">
                <button
                  onClick={() => onEdit(event)} // Updated to use onEdit
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Editar
                </button>
              </td>
            </tr>
            {isEventExpanded(event.id) && (
              <EventDetails
                key={`details-${event.id}`}
                event={event}
                client={customers.find(c => c.id === event.client_id)}
              />
            )}
          </React.Fragment>
        ))}
        </tbody>
      </table>
    </div>
  );
}