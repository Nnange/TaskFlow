import React, { useState } from 'react'
import { LiaTrashAlt } from "react-icons/lia";
import { MdCheck } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";


interface Todo {
  id: string
  task: string
  completed: boolean
}
interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, updatedText: string) => void
}
export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [editText, setEditText] = useState(false);
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center flex-1 min-w-0">
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 h-5 w-5 rounded-full border ${todo.completed ? 'bg-green-500 border-green-500 flex items-center justify-center' : 'border-gray-300 hover:border-blue-500'} mr-3 transition-colors`}
        >
          {todo.completed && <MdCheck className="w-3 h-3 text-white" />}
        </button>
        {editText ? (
          <div className='w-full flex justify-between items-center bg-gray-50 rounded-lg border border-gray-200  transition-all'>
            <input
              type="text"
              defaultValue={todo.task}
              autoFocus
              onBlur={(e) => {
                setEditText(false);
                if (e.target.value.trim() && e.target.value !== todo.task) {
                  onEdit(todo.id, e.target.value.trim());
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.currentTarget.blur();
                } else if (e.key === 'Escape') {
                  setEditText(false);
                }
              }}
              className="w-full focus:outline-none"
            />
            <button 
              className="bg-green-500 rounded-tr-lg rounded-br-lg px-2 hover:bg-green-600 text-white transition-colors cursor-pointer"
              onClick={() => { setEditText(false); onEdit(todo.id, (document.querySelector('input') as HTMLInputElement).value)}}
            >
              edit
            </button>
          </div>
        ) : (
        <span
          className={`text-gray-800 truncate ${todo.completed ? 'line-through text-gray-400' : ''}`}
        >
          {todo.task}
        </span>)
      }
      </div>
      {!editText && (
        <button
          type='button'
          onClick={() => {  setEditText(true)}}
          className="ml-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
        >
          <LiaEdit className="h-4 w-4" />
        </button>
      )}
      <button
        onClick={() => onDelete(todo.id)}
        className="ml-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
      >
        <LiaTrashAlt className="h-4 w-4" />
      </button>
    </div>
  )
}
