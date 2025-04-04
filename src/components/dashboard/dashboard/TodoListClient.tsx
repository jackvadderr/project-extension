'use client'

import dynamic from 'next/dynamic'

// Evita hidratação no server
const TodoList = dynamic(() => import('./TodoList'), {
  ssr: false
})

export default function TodoListWrapper() {
  return <TodoList />
}
