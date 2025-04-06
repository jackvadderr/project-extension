'use client';

import { useState, useRef, useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Todo } from './TodoList'

interface Props {
  todo: Todo
  onEdit: (id: string, newText: string) => void
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
}

export function TodoItem({ todo, onEdit, onDelete, onToggleComplete }: Props) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: todo.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editing])

  const handleBlur = () => {
    setEditing(false)
    onEdit(todo.id, text)
  }

  const handleCheckboxChange = () => {
    onToggleComplete(todo.id)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-2 rounded border flex justify-between items-center group ${
        todo.completed ? 'bg-gray-50 opacity-80' : 'bg-white'
      }`}
    >
      <div className="flex items-center flex-1">
        {/* Alça exclusiva para drag */}
        <span
          {...attributes}
          {...listeners}
          className="mr-2 cursor-move select-none"
          title="Arraste para reordenar"
        >
          ≡
        </span>

        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()}
          className={`mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
            todo.completed ? 'cursor-default' : 'cursor-pointer'
          }`}
        />

        {editing ? (
          <input
            ref={inputRef}
            className="flex-1 bg-transparent outline-none text-sm"
            value={text}
            onChange={e => setText(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter') inputRef.current?.blur()
            }}
          />
        ) : (
          <div
            className={`flex-1 text-sm ${todo.completed ? 'line-through text-gray-500' : ''}`}
            onDoubleClick={() => !todo.completed && setEditing(true)}
          >
            {text}
          </div>
        )}
      </div>

      <button
        className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(todo.id)
        }}
        title="Excluir"
      >
        Excluir
      </button>
    </div>
  )
}
