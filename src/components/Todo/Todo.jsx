import React, { useContext } from 'react'
import './Todo.css'
import { Check2,PencilFill,Trash3Fill } from 'react-bootstrap-icons';
import { TodosContext } from '../../context/TodosContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { ToastContext } from '../../context/ToastContext';


const Todo = ({todo}) => {

    const {todos,setTodos} =useContext(TodosContext)
    const [modalShow, setModalShow] = useState(false);
    const [updateTitle,setUbdateTitle] = useState(todo.title) 
    const [show, setShow] = useState(false);
    const {handleToast}= useContext(ToastContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleCheckClick(){
            const updatedTodos = todos.map((t)=>{
                if(t.id===todo.id){
                  t.isCompleted = !t.isCompleted
                }
                return t 
            })
            setTodos(updatedTodos)
            localStorage.setItem("todos",JSON.stringify(updatedTodos))
    }

    function handleDelete(){
        const updatedTodos = todos.filter((t)=>t.id!==todo.id)
        setTodos(updatedTodos)
        localStorage.setItem("todos",JSON.stringify(updatedTodos))
        handleToast("successfully deleted")
    }

    function handleUpdate(){
        const updatedTodos = todos.map((t)=>{
            if(t.id===todo.id){
                return {...t , title:updateTitle}
            }else{return t}
        })
        setTodos(updatedTodos)
        localStorage.setItem("todos",JSON.stringify(updatedTodos))
        setShow(false)
        handleToast("successfully updated ")
    }


    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4>Confirmation</h4>
              <p >
                Are you sure you want delete this todo ?
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
              <Button variant='danger' onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
          </Modal>
          
        );
      }

  return (
    <div className='todo d-flex  justify-content-between align-items-center bg-white rounded-3  px-2 gap-3 '>
        <div className="left-side d-flex justify-content-center gap-2  w-sm-100">
            <Trash3Fill onClick={() => setModalShow(true)} style={{border:"1px solid red",color:"red"}}/>
            <PencilFill onClick={handleShow} style={{border:"1px solid blue",color:"blue"}}/>
            <Check2 onClick={handleCheckClick} style={{border:"1px solid green",color:todo.isCompleted?"white":"green",background:todo.isCompleted?"green":"white"}} />
        </div>
        <div className="right-side  d-flex flex-wrap">
            <h2>{todo.title}</h2>
        </div>
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>New Title</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={updateTitle}
                onChange={(e)=>{setUbdateTitle(e.target.value)}}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Todo




