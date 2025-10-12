import axios from 'axios'
import { Todo } from '../interfaces/Todo'
import { store } from '../redux/store'
import { logout } from '../redux/authSlice'

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_BASE_URL='http://localhost:9091'
const API_BASE_URL='http://192.168.178.36:9091'



// Create an axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

//  Interceptors for request and response
api.interceptors.request.use((config) => {
  // You can add auth tokens here if needed
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

api.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response?.status === 401 && error.response?.data === "Token expired") {
    // Handle unauthorized access, e.g., redirect to login
    console.error('Unauthorized! Redirecting to login...')
    store.dispatch(logout())
    window.location.href = '/login'
  }
  return Promise.reject(error)
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
  // Edit a todo
  editTodo: async (id: string, task: string): Promise<Todo> => {
    const response = await api.put(`/api/todos/${id}`, {
      task,
    })
    return response.data
  },
  // Delete a todo
  deleteTodo: async (id: string): Promise<void> => {
    await api.delete(`/api/todos/${id}`)
  },
  // Clear all completed todos
  clearCompleted: async (): Promise<void> => {
    await api.delete('/api/todos/completed')
  },
}
