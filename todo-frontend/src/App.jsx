import './App.css'
import TodoCard from './components/TodoCard'
import { Footer } from './components/Footer'

function App() {

  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center'>
        <TodoCard />
        <Footer />
      </div>
    </>
  )
}

export default App
