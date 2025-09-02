import { TodoCardFooter } from "./TodoCardFooter";
import Header from "./Header";
import TodoInput from "./TodoInput";
import { useEffect, useState } from "react";
import { TodoList } from "./TodoList";
import { todoApi } from "../services/api";
import {Todo as TodoType} from '../interfaces/Todo'


type FilterType = 'all' | 'active' | 'completed';


function TodoCard() {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [filter, setFilter] = useState<FilterType>('all')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true)
        const data = await todoApi.getAllTodos()
        setTodos(data)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch todos: ',err)
        setError('Failed to load tasks. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchTodos()
  }, [])

  // const addTodo = (text: string) => {
  //   if (text.trim()) {
  //     setTodos([
  //       ...todos,
  //       {
  //         id: Date.now(),
  //         text,
  //         completed: false,
  //       },
  //     ])
  //   }
  // }
  // const toggleTodo = (id: number) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id
  //         ? {
  //             ...todo,
  //             completed: !todo.completed,
  //           }
  //         : todo,
  //     ),
  //   )
  // }
  // const deleteTodo = (id: number) => {
  //   setTodos(todos.filter((todo) => todo.id !== id))
  // }
  // const clearCompleted = () => {
  //   setTodos(todos.filter((todo) => !todo.completed))
  // }

  const addTodo = async (text: string) => {
    if (text.trim()) {
      try {
        setError(null)
        const newTodo = await todoApi.createTodo(text)
        setTodos([...todos, newTodo])
      } catch (err) {
        console.error('Failed to add todo:', err)
        setError('Failed to add todo. Please try again.')
      }
    }
  }
  const toggleTodo = async (id: number) => {
    try {
      setError(null)
      const todoToUpdate = todos.find((todo) => todo.id === id)
      if (!todoToUpdate) return
      const updatedTodo = await todoApi.toggleTodo(todoToUpdate)
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)))
    } catch (err) {
      console.error('Failed to update todo:', err)
      setError('Failed to update todo. Please try again.')
    }
  }
  const deleteTodo = async (id: number) => {
    try {
      setError(null)
      await todoApi.deleteTodo(id)
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (err) {
      console.error('Failed to delete todo:', err)
      setError('Failed to delete todo. Please try again.')
    }
  }
  const clearCompleted = async () => {
    try {
      setError(null)
      await todoApi.clearCompleted()
      setTodos(todos.filter((todo) => !todo.completed))
    } catch (err) {
      console.error('Failed to clear completed todos:', err)
      setError('Failed to clear completed todos. Please try again.')
    }
  }


  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })
  const activeTodoCount = todos.filter((todo) => !todo.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center py-12 px-4">
        <div className="border rounded-lg mx-4 bg-white shadow-md text-black max-w-full md:w-3/4 lg:w-1/2">
          <Header />

          <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          <TodoInput onAdd={addTodo} />
          {loading ? (
            <div className="py-8 text-center text-gray-500">
              <p>Loading tasks...</p>
            </div>
          ) : (
            <>
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
              <TodoCardFooter
                activeCount={activeTodoCount}
                hasCompleted={todos.length > activeTodoCount}
                filter={filter}
                onFilterChange={setFilter}
                onClearCompleted={clearCompleted}
              />
            </>
          )}
        </div>
        </div>
    </div>
  );
}


export default TodoCard;
