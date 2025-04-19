import CostumerRepository from '@/data/repository/impl/CustomerRepository';

export class DeleteCustomerUsecase {
  private repository: CostumerRepository;

  constructor(repository: CostumerRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<void> {
    return await this.repository.delete(id);
  }
}
