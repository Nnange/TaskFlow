import axios from 'axios'
import { Todo } from '../interfaces/Todo'

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_BASE_URL='http://localhost:9091'
const API_BASE_URL='http://192.168.2.90:9091'



// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
// API functions for todo operations
export const todoApi = {
  // Get all todos
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await api.get('/api/todos')
    return response.data
  },
  // Add a new todo
  createTodo: async (text: string): Promise<Todo> => {
    const response = await api.post('/api/todos', {
      task: text, 
      completed: false 
    })
    return response.data
  },
  // Toggle todo completion status
  toggleTodo: async (todo: Todo): Promise<Todo> => {
    const response = await api.put(`/api/todos/${todo.id}`, {
      ...todo,
      completed: !todo.completed,
    })
    return response.data
  },
  // Delete a todo
  deleteTodo: async (id: number): Promise<void> => {
    await api.delete(`/api/todos/${id}`)
  },
  // Clear all completed todos
  clearCompleted: async (): Promise<void> => {
    await api.delete('/api/todos/completed')
  },
}
