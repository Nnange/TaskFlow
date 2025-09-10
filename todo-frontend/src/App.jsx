import './App.css'
import TodoCard from './components/TodoCard'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

function App() {

  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center'>
        <Header />
        <TodoCard />
        <Footer />
      </div>
    </>
  )
}

export default App
