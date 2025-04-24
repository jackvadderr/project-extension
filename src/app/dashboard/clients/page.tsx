import { Suspense } from 'react';
import { listAllCustomers } from '@/actions/clients/list-all-customer-action';
import { createCustomerAction } from '@/actions/clients/create-customer-action';
import { updateCustomerAction } from '@/actions/clients/update-customer-action';
import { deleteCustomerAction } from '@/actions/clients/delete-customer-action';
import ClientListPageWrapper from '@/components/dashboard/customers/ClientListPageWrapper';
import { LoadingSpinner } from '@/components/dashboard/LoadingSpinner';

export const metadata = {
  title: 'Clientes - Dashboard',
  description: 'Gerenciamento de clientes'
};

async function ClientsDataFetcher() {
  const clients = await listAllCustomers();

  return (
    <ClientListPageWrapper
      initialClients={clients}
      createClientAction={createCustomerAction}
      updateClientAction={updateCustomerAction}
      deleteClientsAction={deleteCustomerAction}
    />
  );
}

export default function DashboardClientsPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Carregando clientes..." />}>
      <ClientsDataFetcher />
    </Suspense>
  );
}