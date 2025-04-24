"use client";

import React from "react";
import { Checkbox } from '@/components/ui/checkbox';
import { Customer } from '@/types/Customer';
import { useExpandableRows } from '@/hooks/useExpandableRows';
import { CustomerDetailsRow } from './CustomerDetails';

interface ClientListProps {
  clients: Customer[];
  selectedClients: string[];
  onSelectClient: (id: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  isAllSelected: boolean;
  onEdit: (client: Customer) => void;
}

export default function ClientList({
                                     clients,
                                     selectedClients,
                                     onSelectClient,
                                     onSelectAll,
                                     isAllSelected,
                                     onEdit
                                   }: ClientListProps) {
  const { toggleRow, isRowExpanded } = useExpandableRows();

  const getStatusColor = (status: string) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const handleRowClick = (e: React.MouseEvent, client: Customer) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button') && !target.closest('input[type="checkbox"]')) {
      toggleRow(client.id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate" style={{ borderSpacing: '0 0.5rem' }}>
        <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <Checkbox checked={isAllSelected} onCheckedChange={onSelectAll} />
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
        </tr>
        </thead>
        <tbody>
        {clients.map(client => (
          <React.Fragment key={client.id}>
            <tr
              className="group cursor-pointer"
              onClick={(e) => handleRowClick(e, client)}
            >
              <td className="px-6 py-4 whitespace-nowrap bg-white group-hover:bg-gray-50 first:rounded-l-xl first:border-l first:border-gray-200">
                <Checkbox
                  checked={selectedClients.includes(client.id)}
                  onCheckedChange={checked => onSelectClient(client.id, checked as boolean)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap bg-white group-hover:bg-gray-50">
                <div className="text-sm font-medium text-gray-900">{client.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap bg-white group-hover:bg-gray-50 text-sm text-gray-500">
                {client.email || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap bg-white group-hover:bg-gray-50 text-sm text-gray-500">
                {client.cpf}
              </td>
              <td className="px-6 py-4 whitespace-nowrap bg-white group-hover:bg-gray-50">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(client.status)}`}>
                    {client.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-white group-hover:bg-gray-50 last:rounded-r-xl last:border-r last:border-gray-200">
                <button onClick={() => onEdit(client)} className="text-blue-600 hover:text-blue-900">
                  Editar
                </button>
              </td>
            </tr>
            {isRowExpanded(client.id) && (
              <CustomerDetailsRow customer={client} />
            )}
          </React.Fragment>
        ))}
        </tbody>
      </table>
    </div>
  );
}