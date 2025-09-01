import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// Define the Todo type
export interface Todo {
  id: number
  text: string
  completed: boolean
}
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
    const response = await api.get('/todos')
    return response.data
  },
  // Add a new todo
  createTodo: async (text: string): Promise<Todo> => {
    const response = await api.post('/todos', { text, completed: false })
    return response.data
  },
  // Toggle todo completion status
  toggleTodo: async (todo: Todo): Promise<Todo> => {
    const response = await api.put(`/todos/${todo.id}`, {
      ...todo,
      completed: !todo.completed,
    })
    return response.data
  },
  // Delete a todo
  deleteTodo: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`)
  },
  // Clear all completed todos
  clearCompleted: async (): Promise<void> => {
    await api.delete('/todos/completed')
  },
}
