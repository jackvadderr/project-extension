import { User, Prisma } from '@prisma/client';
import UserRepository from '@/data/repository/impl/UserRepository';

export class CreateUserUsecase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(userData: Prisma.UserCreateInput): Promise<User> {
    return await this.repository.create(userData);
  }
}