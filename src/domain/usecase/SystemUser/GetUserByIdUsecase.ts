import UserRepository from '@/data/repository/impl/UserRepository';
import { User } from "@prisma/client";

export class GetUserByIdUsecase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<User | null> {
    return await this.repository.findById(id);
  }
}