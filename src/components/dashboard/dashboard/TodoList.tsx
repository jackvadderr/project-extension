'use client';

import { useState } from 'react'
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { TodoItem } from './TodoItem'

export interface Todo {
  id: string
  text: string
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Monitorar a carne' },
    { id: '2', text: 'Verificar bebidas' },
    { id: '3', text: 'Checar iluminação' }
  ])

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

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
  <SortableContext items={todos.map(t => t.id)} strategy={verticalListSortingStrategy}>
  <div className="grid gap-2">
    {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onEdit={handleEdit} />
))}
  </div>
  </SortableContext>
  </DndContext>
)
}
