import React from 'react'
import { TodoItem } from './TodoItem'
interface Todo {
  id: number
  text: string
  completed: boolean
}
interface TodoListProps {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}
export const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        <p>No tasks yet. Add one above!</p>
      </div>
    )
  }
  return (
    <div className="space-y-3 mb-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
