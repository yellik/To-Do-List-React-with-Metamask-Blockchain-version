import { address, abi } from "../config";
import { initializeProvider, initializeReadProvider } from "../scripts/accountScripts";
import { useState, useEffect } from "react";
import { ethers, id } from "ethers";
import { toggleTodo, removeTodo } from "../scripts/handlers";


const provider = new ethers.BrowserProvider(window.ethereum)

export const Item = () => {
   const [todos, setTodos] = useState([])
   const [readContract, setReadContract] = useState()
   useEffect(() => {
    const makeTodoContract = async () => {
        if(window.ethereum === 'undefined'){
            initializeProvider()
        }
        console.log(provider);
    const todoContract = new ethers.Contract(address, abi, provider);
    console.log(todoContract);
    setReadContract(todoContract)

    const todoCount = await todoContract['todoCount']();
    

      try{
       const todoList = [];
        for (let i = 1; i <= todoCount; i++) {
            const todo = await todoContract['todos'](i);
            todoList.push(todo);
        }

        // Log the fetched todo list
        console.log("Todo List:", todoList);
        setTodos(todoList)
        
    } catch (error) {
        console.error("Error fetching todos:", error);
    }

}
makeTodoContract()
    
   }, [])


   const handleRemoveTodo = async (todoId) => {
    try {
    //call the write contract to remove the task
        await removeTodo({ todoId });

        // filter out the selected todoElement from the list
        setTodos(todos.filter(todo => todo.id !== todoId));
    } catch (error) {
        console.error("Error removing todo:", error);
    }
};

    return (
        <>
      
        {todos.map((todo) => {
          const todoIndex = todo[0];
          const todoId = todo[0]; // 1    
          const todoText = todo[1]; // 'Hello world'
          const completed = todo[2]; // false


          return (
            
            <div>
            
            <li key={todoIndex} >
                {`ID: ${todoId}, Text: ${todoText} Completed: ${completed === false}`}
            </li>
            <button onClick={() => toggleTodo({ todoId, completed })}>Done</button>
            <button onClick={() => handleRemoveTodo(todoId)}>Delete Task</button>
            

            </div>
            
        );
            
          
        })}
       
        </>
   )
}