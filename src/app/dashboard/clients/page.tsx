// src/app/dashboard/clients/page.tsx

import CustomerListPage from '../../../components/dashboard/customers/CustomerListPage';
import { getCustomers } from '@/actions/clients/list-all-customer-action';
import { createCustomerAction } from '@/actions/clients/create-customer-action';
import { updateEventAction } from '@/actions/clients/update-customer-action';
import { deleteCustomerAction } from '@/actions/clients/delete-customer-action';

export default async function DashboardClientsPage() {
  try {
    const clients = await getCustomers();
    return (
      <CustomerListPage
        initialClients={clients}
        createClientAction={createCustomerAction}
        updateClientAction={updateEventAction}
        deleteClientsAction={deleteCustomerAction}
      />
    );
  } catch (err) {
    console.error('Error:', err);
    return <p className="text-red-500">Falha ao carregar clientes. Tente novamente mais tarde.</p>;
  }
}