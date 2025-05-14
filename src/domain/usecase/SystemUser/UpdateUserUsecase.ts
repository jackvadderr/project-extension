import UserRepository from '@/data/repository/impl/UserRepository';
import { Prisma, User } from '@prisma/client';

export class UpdateUserUsecase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(userId: string, userData: Partial<Prisma.UserUpdateInput>): Promise<User | null> {
    return await this.repository.update(userId, userData);
  }
}