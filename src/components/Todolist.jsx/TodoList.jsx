import React, { useContext, useEffect, useMemo, useState } from 'react'
import './TodoList.css'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Todo from '../Todo/Todo';
import { TodosContext } from '../../context/TodosContext';
import { ToastContext } from '../../context/ToastContext';




const TodoList = () => {


const [titleInput,setTitleInput]=useState("")
const {todos,setTodos} = useContext(TodosContext)
const [displayedType,setDisplayedType]=useState("all")
const [id,setId]=useState(4)
const {handleToast} = useContext(ToastContext)

const completed = useMemo(()=>{
    return todos.filter((t)=>{
        return t.isCompleted
})
},[todos]) 



const notCompleted = useMemo(()=>{
    return todos.filter((t=>!t.isCompleted))
},[todos])
 

let todosToBeRendered = todos

if(displayedType==="done"){
    todosToBeRendered = completed
}else if(displayedType==="Non-Completed"){
    todosToBeRendered =notCompleted 
}else{ todosToBeRendered = todos}


    const todosjsx = todosToBeRendered.map((t)=>{
        return <Todo key={t.id} todo={t}  />
    })


    useEffect(()=>{
        const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? []
        setTodos(storageTodos)
    },[])

    function handleAddClick(){
        
        if(titleInput===""){
             null 
        }
        else{
            const newTodo={
            id:id,
            title:titleInput,
            details:"",
            isCompleted:false
        }
        const updatedTodos = [...todos,newTodo]
        setTodos(updatedTodos)
        setTitleInput("")
        localStorage.setItem("todos",JSON.stringify(updatedTodos))
        setId(i=>i+1)
        
        }
        handleToast("successfully added")
    }

    function handleDisplayedType(e){
        setDisplayedType(e.target.value)
    }

    
  return (
    <div className='container w-50 max-vh-90 bg-black p-2 flex-column justify-between gap-3 rounded-4'>
        <header className='d-flex flex-column align-items-center gap-4 text-white'>
            <h1>My Todos</h1>
            <ButtonGroup className='group'  aria-label="Basic example">
                <Button value={"Non-Completed"} onClick={handleDisplayedType} variant="danger">Non-Completed</Button>
                <Button value={"done"} onClick={handleDisplayedType} variant="success">Done</Button>
                <Button  value={"all"} onClick={handleDisplayedType}  variant="primary">All</Button>
            </ButtonGroup>
        </header>
        <div className="todos-container d-flex flex-column gap-2 overflow-scroll max-vh-50 p-2  mb-3">
            {todosjsx}
        </div>
        <footer>
            <input value={titleInput} onChange={(e)=>setTitleInput(e.target.value)} className=' border-0 rounded-start px-3'  type="text" /> 
            <Button onClick={handleAddClick} variant="primary " >Add</Button>
        </footer>
    </div>
  )
}

export default TodoList
