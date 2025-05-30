'use client'

import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { TodoItem } from './TodoItem'
import { Task, Prisma } from '@prisma/client'

interface TodoListProps {
  tasks: Task[]
  createTask: (data: Prisma.TaskCreateInput) => Promise<Task>
  updateTask: (id: string, data: Partial<Prisma.TaskUpdateInput>) => Promise<Task | null>
  deleteTask: (id: string) => Promise<void>
}

export interface Todo {
  id: string
  text: string
  completed: boolean
}

export default function TodoList({
                                   tasks: initialTasks,
                                   createTask,
                                   updateTask,
                                   deleteTask
                                 }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(
    initialTasks.map(task => ({
      id: task.id,
      text: task.text,
      completed: task.completed
    }))
  )
  const [newTodoText, setNewTodoText] = useState('')
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = todos.findIndex(t => t.id === active.id)
      const newIndex = todos.findIndex(t => t.id === over.id)
      setTodos(arrayMove(todos, oldIndex, newIndex))
    }
  }

  const handleAdd = async () => {
    if (newTodoText.trim()) {
      try {
        const newTask = await createTask({
          text: newTodoText.trim(),
          completed: false
        })
        setTodos([...todos, {
          id: newTask.id,
          text: newTask.text,
          completed: newTask.completed
        }])
        setNewTodoText('')
      } catch (error) {
        console.error('Failed to create task:', error)
      }
    }
  }

  const handleEdit = async (id: string, newText: string) => {
    try {
      const updatedTask = await updateTask(id, { text: newText })
      if (updatedTask) {
        setTodos(prev =>
          prev.map(todo => (todo.id === id ? { ...todo, text: newText } : todo))
        )
      }
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id)
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  const handleToggleComplete = async (id: string) => {
    const todo = todos.find(t => t.id === id)
    if (todo) {
      try {
        const updatedTask = await updateTask(id, { completed: !todo.completed })
        if (updatedTask) {
          setTodos(prev => {
            const updatedTodos = prev.map(todo =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
            return [
              ...updatedTodos.filter(t => !t.completed),
              ...updatedTodos.filter(t => t.completed)
            ]
          })
        }
      } catch (error) {
        console.error('Failed to toggle task completion:', error)
      }
    }
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Adicionar novo item"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:scale-95 transition"
          onClick={handleAdd}
        >
          Adicionar
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={todos.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div className="grid gap-3">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
