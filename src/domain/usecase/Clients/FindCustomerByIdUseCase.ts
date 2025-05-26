import CustomerRepository from '@/data/repository/impl/CustomerRepository';
import { Customer } from '@prisma/client';

export class FindCustomerByIdUseCase {
  private repository: CustomerRepository;

  constructor(repository: CustomerRepository) {
    this.repository = repository;
  }

  async execute(data: string[]): Promise<Customer | null> {
    return await this.repository.findById(data);
  }
}
