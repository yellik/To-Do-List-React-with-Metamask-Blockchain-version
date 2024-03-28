import { Item } from "./Item"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { toggleTodo, addTodo } from "../scripts/handlers"
import { AddTodo } from "./AddTodo"

let provider;
provider = new ethers.BrowserProvider(window.ethereum)

export const TodoListComp = ({todoId, todoText}) => {
    const[inputValue, setInputValue] = useState('')
    
   useEffect(() => {
 

   }, [])

  const onChange = (event) => {
    setInputValue(event.target.value)
  }
   
    return (
        <>
        <ul>
            <div>
            
                <Item todoId={todoId} todoText={todoText}/>
                
            </div>
        </ul>
        <label htmlFor="todo">Add a new todo:</label>
        <input 
        type="text"
        value={inputValue}
        onChange={onChange}
        placeholder="type your task here"
         />
        <button onClick={()=> addTodo({todoId, todoText, inputValue})}>Add a new Task</button>
        
        </>
   )
}