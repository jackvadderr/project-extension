"use server";

import { Prisma } from '@prisma/client';
import { UpdateCustomerUsecase } from '@/domain/usecase/Clients/UpdateCustomerUsecase';
import CustomerRepository from '@/data/repository/impl/CustomerRepository';
import { CustomerStatus } from '@/types/Customer';

export async function updateCustomerAction(id: string, data: Partial<Prisma.CustomerUpdateInput>): Promise<{
  id: string;
  name: string;
  cpf: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  status: CustomerStatus;
  createdAt: Date;
  updatedAt: Date;
}> {
  const repository = new CustomerRepository();
  const usecase = new UpdateCustomerUsecase(repository);

  const newCustomer = await usecase.execute(
    id,
    {
      name: data.name,
      cpf: data.cpf,
      email: data.email,
      phone: data.phone,
      address: data.address,
      status: data.status as CustomerStatus,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      events: data.events,
    }
  );

  if (!newCustomer) {
    throw new Error('Failed to update event');
  }

  return {
    id: newCustomer.id,
    name: newCustomer.name,
    cpf: newCustomer.cpf,
    phone: newCustomer.phone || "",
    email: newCustomer.email || "",
    address: newCustomer.address || "",
    status: newCustomer.status as CustomerStatus,
    createdAt: newCustomer.createdAt,
    updatedAt: newCustomer.updatedAt,
  };
}
