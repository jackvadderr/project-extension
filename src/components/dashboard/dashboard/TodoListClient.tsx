'use client'

import dynamic from 'next/dynamic'
import { Task, Prisma } from '@prisma/client'

const TodoList = dynamic(() => import('./TodoList'), {
  ssr: false
})

interface TodoListWrapperProps {
  tasks: Task[]
  createTask: (data: Prisma.TaskCreateInput) => Promise<Task>
  updateTask: (id: string, data: Partial<Prisma.TaskUpdateInput>) => Promise<Task | null>
  deleteTask: (id: string) => Promise<void>
}

export default function TodoListWrapper({
                                          tasks,
                                          createTask,
                                          updateTask,
                                          deleteTask
                                        }: TodoListWrapperProps) {
  return (
    <div className="space-y-2">
      <TodoList
        tasks={tasks}
        createTask={createTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  )
}
