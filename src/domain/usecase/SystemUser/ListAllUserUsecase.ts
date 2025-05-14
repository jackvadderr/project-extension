import UserRepository from '@/data/repository/impl/UserRepository';
import { User } from '@prisma/client';

export class ListAllUserUsecase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(): Promise<User[]> {
    return await this.repository.findAll();
  }
}