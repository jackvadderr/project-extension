'use server';

import CustomerRepository from '@/data/repository/impl/CustomerRepository';
import { Customer } from '@prisma/client';
import { FindCustomerByIdsUseCase } from '@/domain/usecase/Clients/FindCustomerByIdsUseCase';

export async function findCustomersByIdsAction(ids: string[]): Promise<Customer[]> {
  const repository = new CustomerRepository();
  const usecase = new FindCustomerByIdsUseCase(repository);

  return await usecase.execute(ids);
}