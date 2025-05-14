import UserRepository from '@/data/repository/impl/UserRepository';

export class DeleteUserUsecase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<void> {
    return await this.repository.delete(id);
  }
}