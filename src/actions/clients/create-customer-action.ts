"use server";

import { CreateCustomerUseCase } from '@/domain/usecase/Clients/CreateCustomerUseCase';
import CostumerRepository from '@/data/repository/impl/CustomerRepository';
import { Customer, CustomerStatus } from '@/types/Customer';

export async function createCustomerAction(customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'events'>): Promise<Customer> {
  const repository = new CostumerRepository();
  const usecase = new CreateCustomerUseCase(repository);

  const newCustomer = await usecase.execute({
    name: customerData.name,
    cpf: customerData.cpf,
    phone: customerData.phone || null,
    email: customerData.email || null,
    address: customerData.address || null,
    status: (customerData.status || 'active') as CustomerStatus,
  });

  return {
    id: newCustomer.id,
    name: newCustomer.name,
    cpf: newCustomer.cpf,
    phone: newCustomer.phone,
    email: newCustomer.email,
    address: newCustomer.address,
    status: newCustomer.status,
    createdAt: newCustomer.createdAt,
    updatedAt: newCustomer.updatedAt
  };
}