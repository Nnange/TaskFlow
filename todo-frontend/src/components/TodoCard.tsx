import { TodoCardFooter } from "./TodoCardFooter";
import Header from "./Header";
import TodoInput from "./TodoInput";
import { useState } from "react";
import { TodoList } from "./TodoList";

type Todo = {
  id: number
  text: string
  completed: boolean
}
type FilterType = 'all' | 'active' | 'completed';


function TodoCard() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<FilterType>('all');
  const addTodo = (text: string) => {
    if (text.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text,
          completed: false,
        },
      ])
    }
  }
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo,
      ),
    )
  }
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
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

        <div className="p-4">
            <TodoInput onAdd={addTodo}/>
            
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
        </div>
        </div>
    </div>
  );
}


export default TodoCard;
