'use client';

import { useState, useRef, useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Todo } from './TodoList'

interface Props {
  todo: Todo
  onEdit: (id: string, newText: string) => void
}

export function TodoItem({ todo, onEdit }: Props) {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-2 bg-gray-100 rounded border hover:cursor-move flex justify-between items-center"
      {...attributes}
      {...listeners}
    >
      {editing ? (
        <input
          ref={inputRef}
          className="w-full bg-transparent outline-none text-sm"
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') inputRef.current?.blur()
          }}
        />
      ) : (
        <div
          className="w-full text-sm"
          onDoubleClick={() => setEditing(true)}
        >
          {text}
        </div>
      )}
    </div>
  )
}
