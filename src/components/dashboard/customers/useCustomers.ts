import { useState } from 'react';
import { Customer, CustomerCreateInput, CustomerUpdateInput } from '@/types/Customer';

export function useCustomers(initialCustomers: Customer[]) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleCreate = async (
    createAction: (data: CustomerCreateInput) => Promise<Customer>,
    data: CustomerCreateInput
  ) => {
    const newCustomer = await createAction(data);
    setCustomers(prev => [...prev, newCustomer]);
    return newCustomer;
  };

  const handleUpdate = async (
    updateAction: (id: string, data: Partial<CustomerUpdateInput>) => Promise<Customer>,
    id: string,
    data: Partial<CustomerUpdateInput>
  ) => {
    const updated = await updateAction(id, data);
    setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
    return updated;
  };

  const handleDelete = async (
    deleteAction: (ids: string[]) => Promise<void>,
    ids: string[]
  ) => {
    await deleteAction(ids);
    setCustomers(prev => prev.filter(c => !ids.includes(c.id)));
    setSelectedIds([]);
  };

  const toggleSelection = (id: string, selected: boolean) => {
    setSelectedIds(prev =>
      selected ? [...prev, id] : prev.filter(i => i !== id)
    );
  };

  return {
    customers,
    selectedIds,
    handleCreate,
    handleUpdate,
    handleDelete,
    toggleSelection,
    setSelectedIds
  };
}