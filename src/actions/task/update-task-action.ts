// src/actions/task/update-task-action.ts
"use server";

import { Prisma, Task } from '@prisma/client';
import TaskRepository from '@/data/repository/impl/TaskRepository';
import { UpdateTaskUsecase } from '@/domain/usecase/TodoListTasks/UpdateTaskUsecase';

export async function updateTaskAction(id: string, data: Partial<Prisma.TaskUpdateInput>): Promise<Task | null> {
  const repository = new TaskRepository();
  const usecase = new UpdateTaskUsecase(repository);

  return await usecase.execute(id, data);
}