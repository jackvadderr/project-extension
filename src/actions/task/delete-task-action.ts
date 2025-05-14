// src/actions/task/delete-task-action.ts
"use server";

import TaskRepository from '@/data/repository/impl/TaskRepository';
import { DeleteTaskUsecase } from '@/domain/usecase/TodoListTasks/DeleteTaskUsecase';

export async function deleteTaskAction(id: string): Promise<void> {
  const repository = new TaskRepository();
  const usecase = new DeleteTaskUsecase(repository);

  await usecase.execute(id);
}