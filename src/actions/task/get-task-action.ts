// src/actions/task/get-task-action.ts
"use server";

import TaskRepository from '@/data/repository/impl/TaskRepository';
import { GetTaskUsecase } from '@/domain/usecase/TodoListTasks/GetTaskUsecase';
import { Task } from '@prisma/client';

export async function getTaskAction(id: string): Promise<Task | null> {
  const repository = new TaskRepository();
  const usecase = new GetTaskUsecase(repository);

  return await usecase.execute(id);
}