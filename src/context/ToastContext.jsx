import { createContext,useState } from "react";
import MyToast from "../components/Toast/Toast";

export const ToastContext=createContext()

const ToastProvider = (props)=>{

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    function handleToast(message){
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000);
      setMessage(message)
    }
    
    return(
        <ToastContext.Provider  value={{handleToast}}>
            <MyToast show={show} message={message}/>
            {props.children}
        </ToastContext.Provider>
    )
}
export default ToastProvider