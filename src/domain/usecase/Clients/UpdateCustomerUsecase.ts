import { Customer, Prisma } from '@prisma/client';
import CostumerRepository from '@/data/repository/impl/CustomerRepository';

export class UpdateCustomerUsecase {
  private repository: CostumerRepository;

  constructor(repository: CostumerRepository) {
    this.repository = repository;
  }

  async execute(id: string, eventData: Partial<Prisma.CustomerUpdateInput>): Promise<Customer | null> {
    return await this.repository.update(id, eventData);
  }
}