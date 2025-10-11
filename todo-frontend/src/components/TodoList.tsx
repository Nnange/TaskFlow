import React from 'react'
import { TodoItem } from './TodoItem'
interface Todo {
  id: string
  task: string
  completed: boolean
}
interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, updatedText: string) => void
}
export const TodoList = ({ todos, onToggle, onDelete, onEdit }: TodoListProps) => {
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
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
