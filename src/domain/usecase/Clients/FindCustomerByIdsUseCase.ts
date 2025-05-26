import CustomerRepository from '@/data/repository/impl/CustomerRepository';
import { Customer } from '@prisma/client';

export class FindCustomerByIdsUseCase {
  private repository: CustomerRepository;

  constructor(repository: CustomerRepository) {
    this.repository = repository;
  }

  async execute(data: string[]): Promise<Customer[]> {
    return await this.repository.findManyByIds(data);
  }
}
