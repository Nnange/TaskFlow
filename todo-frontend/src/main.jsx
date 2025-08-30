import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TodoCard from './components/TodoCard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoCard />
  </StrictMode>,
)
