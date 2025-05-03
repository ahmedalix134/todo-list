import './App.css'
import TodoList from './components/Todolist.jsx/TodoList'
import { useState } from 'react'
import { TodosContext } from './context/TodosContext'
import ToastProvider from './context/ToastContext'

const intialTodos = [
    {
        id:1,
        title:'reading a book',
        isCompleted:false
    },
    {
        id:2,
        title:'visiting my cousin',
        isCompleted:false
    },
    {
        id:3,
        title:'go party',
        isCompleted:false
    }
]

function App() {


const [todos,setTodos]=useState(intialTodos)




  return (
    <TodosContext.Provider value={{todos,setTodos}}>
      <ToastProvider>
        <TodoList/>
      </ToastProvider>
    </TodosContext.Provider>
  )
}

export default App
