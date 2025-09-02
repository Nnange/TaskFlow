import React from 'react'
import { LiaTrashAlt } from "react-icons/lia";
import { CiCircleCheck } from "react-icons/ci";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdCheck } from "react-icons/md";

interface Todo {
  id: number
  task: string
  completed: boolean
}
interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}
export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center flex-1 min-w-0">
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 h-5 w-5 rounded-full border ${todo.completed ? 'bg-green-500 border-green-500 flex items-center justify-center' : 'border-gray-300 hover:border-blue-500'} mr-3 transition-colors`}
        >
          {todo.completed && <MdCheck className="w-3 h-3 text-white" />}
        </button>
        <span
          className={`text-gray-800 truncate ${todo.completed ? 'line-through text-gray-400' : ''}`}
        >
          {todo.task}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <LiaTrashAlt className="h-4 w-4" />
      </button>
    </div>
  )
}
