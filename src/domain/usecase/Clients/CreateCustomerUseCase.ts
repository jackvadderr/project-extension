import CustomerRepository from '@/data/repository/impl/CustomerRepository';
import { Customer, Prisma } from '@prisma/client';

export class CreateCustomerUseCase {
  private repository: CustomerRepository;

  constructor(repository: CustomerRepository) {
    this.repository = repository;
  }

  async execute(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return await this.repository.create(data);
  }
}
