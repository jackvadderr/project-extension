"use client";

import { useState } from "react";
import { Customer } from "@/types/Customer";
import ClientListPage from '@/components/dashboard/customers/CustomerListPage';

interface ClientListPageWrapperProps {
  initialClients: Customer[];
  createClientAction: (clientData: Omit<Customer, 'id'>) => Promise<Customer>;
  updateClientAction: (id: string, clientData: Partial<Customer>) => Promise<Customer>;
  deleteClientsAction: (ids: string[]) => Promise<void>;
}

export default function ClientListPageWrapper({
                                                initialClients,
                                                createClientAction,
                                                updateClientAction,
                                                deleteClientsAction,
                                              }: ClientListPageWrapperProps) {
  const [clients, setClients] = useState<Customer[]>(initialClients);

  const handleCreateClient = async (clientData: Omit<Customer, 'id'>): Promise<Customer> => {
    try {
      const newClient = await createClientAction(clientData);
      setClients(prev => [...prev, newClient]);
      return newClient;
    } catch (err) {
      console.error('Error creating client:', err);
      throw err;
    }
  };

  const handleUpdateClient = async (id: string, clientData: Partial<Customer>): Promise<Customer> => {
    try {
      const updatedClient = await updateClientAction(id, clientData);
      setClients(prev => prev.map(client =>
        client.id === updatedClient.id ? updatedClient : client
      ));
      return updatedClient;
    } catch (err) {
      console.error('Error updating client:', err);
      throw err;
    }
  };

  const handleDeleteClients = async (ids: string[]): Promise<void> => {
    try {
      await deleteClientsAction(ids);
      setClients(prev => prev.filter(client => !ids.includes(client.id)));
    } catch (err) {
      console.error('Error deleting clients:', err);
      throw err;
    }
  };

  return (
    <ClientListPage
      initialClients={clients}
      createClientAction={handleCreateClient}
      updateClientAction={handleUpdateClient}
      deleteClientsAction={handleDeleteClients}
    />
  );
}