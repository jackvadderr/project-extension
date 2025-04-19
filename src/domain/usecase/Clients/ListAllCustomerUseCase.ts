import CostumerRepository from '@/data/repository/impl/CustomerRepository';
import { Customer } from '@prisma/client';

export class ListAllCustomerUseCase {
  private repository: CostumerRepository;

  constructor(repository: CostumerRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Customer[]> {
      return await this.repository.findAll();
  }
}
