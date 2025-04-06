"use server";

import { BaseTask } from '@/types/Task';
import { CreateTaskUsecase } from '@/domain/usecase/TodoListTasks/CreateTaskUsecase';
import TaskRepository from '@/data/repository/impl/TaskRepository';

export async function createTaskAction(date: Omit<BaseTask, 'id'>): Promise<BaseTask> {
  const repository = new TaskRepository();
  const usecase = new CreateTaskUsecase(repository);

  return await usecase.execute(date);
}
