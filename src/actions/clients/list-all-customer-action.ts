"use server";

import CustomerRepository from '@/data/repository/impl/CustomerRepository';
import { CustomerStatus } from '@/types/Customer';
import { ListAllCustomerUseCase } from '@/domain/usecase/Clients/ListAllCustomerUseCase';

export async function listAllCustomers(): Promise<{
  id: string;
  name: string;
  cpf: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  status: CustomerStatus;
  createdAt: Date;
  updatedAt: Date;
}[]> {
  const repository = new CustomerRepository();
  const usecase = new ListAllCustomerUseCase(repository);

  const customers = await usecase.execute();

  return customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    cpf: customer.cpf,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
    status: customer.status as CustomerStatus,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt
  }));
}