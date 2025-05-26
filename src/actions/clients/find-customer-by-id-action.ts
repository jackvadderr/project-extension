'use server';

import CustomerRepository from '@/data/repository/impl/CustomerRepository';
import { FindCustomerByIdUseCase } from '@/domain/usecase/Clients/FindCustomerByIdUseCase';
import { Customer } from '@prisma/client';

export async function findCustomerById(id: string): Promise<Customer | null> {
  const repository = new CustomerRepository();
  const usecase = new FindCustomerByIdUseCase(repository);

  return await usecase.execute(id);
}