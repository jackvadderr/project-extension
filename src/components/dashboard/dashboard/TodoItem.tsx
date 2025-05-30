'use client'

import { useState, useRef, useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Todo } from './TodoList'
import { Trash2, GripVertical } from 'lucide-react'

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
    if (editing && inputRef.current) inputRef.current.focus()
  }, [editing])

  const handleBlur = () => {
    setEditing(false)
    onEdit(todo.id, text)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-3 rounded-xl border flex justify-between items-center bg-white group transition shadow-sm hover:shadow-md ${
        todo.completed ? 'opacity-70 line-through text-gray-500' : ''
      }`}
    >
      <div className="flex items-center flex-1 gap-2">
        <span
          {...attributes}
          {...listeners}
          title="Arrastar"
          className="text-gray-400 hover:text-gray-600 transition cursor-grab"
        >
          <GripVertical size={18} />
        </span>

        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
        />

        {editing ? (
          <input
            ref={inputRef}
            className="flex-1 bg-transparent outline-none text-sm text-gray-800"
            value={text}
            onChange={e => setText(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.blur()}
          />
        ) : (
          <div
            className="flex-1 text-sm text-gray-800 cursor-text"
            onDoubleClick={() => !todo.completed && setEditing(true)}
          >
            {text}
          </div>
        )}
      </div>

      <button
        title="Excluir"
        onClick={() => onDelete(todo.id)}
        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}
