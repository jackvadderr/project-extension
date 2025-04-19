"use server";

import CostumerRepository from '@/data/repository/impl/CustomerRepository';
import { DeleteCustomerUsecase } from '@/domain/usecase/Clients/DeleteCustomerUsecase';

export async function deleteCustomerAction(ids: string[]): Promise<void> {
  const repository = new CostumerRepository();
  const usecase = new DeleteCustomerUsecase(repository);

  await Promise.all(ids.map(id => usecase.execute(id)));
}
