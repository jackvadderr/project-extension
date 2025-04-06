'use client';

import { useState } from 'react'
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { TodoItem } from './TodoItem'

export interface Todo {
  id: string
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Monitorar a carne', completed: false },
    { id: '2', text: 'Verificar bebidas', completed: false },
    { id: '3', text: 'Checar iluminação', completed: false }
  ])
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

  const handleEdit = (id: string, newText: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, text: newText } : todo))
    )
  }

  const handleAdd = () => {
    if (newTodoText.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: newTodoText.trim(),
        completed: false
      }
      setTodos([...todos, newTodo])
      setNewTodoText('')
    }
  }

  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleToggleComplete = (id: string) => {
    setTodos(prev => {
      const updatedTodos = prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
      // Reordena sempre: incompletos primeiro, completos depois
      return [
        ...updatedTodos.filter(t => !t.completed),
        ...updatedTodos.filter(t => t.completed)
      ]
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Adicionar novo item"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAdd}
        >
          Adicionar
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={todos.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div className="grid gap-2">
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
