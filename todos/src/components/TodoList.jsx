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
   
  const handleAddTodo = () => {
    try {
        addTodo({todoId, todoText, inputValue});
        const newTodo = {
            todoId: todos.length + 1, // Assign a unique ID
            todoText: inputValue,
            completed: false
        };
        const updatedTodos = [...todos, newTodo];
        localStorage.setItem('data', JSON.stringify(updatedTodos));
    } catch (error) {
        console.log('there was an error in adding todos', error);
    }
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
        <button onClick={()=> handleAddTodo({todoId, todoText, inputValue})}>Add a new Task</button>
        
        </>
   )
}