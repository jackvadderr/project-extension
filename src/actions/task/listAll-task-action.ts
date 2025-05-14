// src/actions/task/list-all-task-action.ts
"use server";

import TaskRepository from '@/data/repository/impl/TaskRepository';
import { ListAllTaskUsecase } from '@/domain/usecase/TodoListTasks/ListAllTaskUsecase';
import { Task } from '@prisma/client';

export async function listAllTaskAction(): Promise<Task[]> {
  const repository = new TaskRepository();
  const usecase = new ListAllTaskUsecase(repository);

  return await usecase.execute();
}