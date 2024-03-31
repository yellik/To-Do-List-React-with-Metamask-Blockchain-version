import { address, abi } from "../config";
import { initializeProvider, initializeReadProvider } from "../scripts/accountScripts";
import { useState, useEffect } from "react";
import { ethers, id } from "ethers";
import { toggleTodo, removeTodo } from "../scripts/handlers";


const provider = new ethers.BrowserProvider(window.ethereum)

export const Item = () => {
   const [todos, setTodos] = useState(() => {
    const storedData = localStorage.getItem('data');
    return storedData ? JSON.parse(storedData) : [];
  });
   const [readContract, setReadContract] = useState()
   useEffect(() => {
    const makeTodoContract = async () => {
        if (window.ethereum === 'undefined') {
            initializeProvider();
        }
        console.log(provider);
        const todoContract = new ethers.Contract(address, abi, provider);
        console.log(todoContract);
        setReadContract(todoContract);

        const todoCount = await todoContract['todoCount']();

        try {
            const todoList = [];
            for (let i = 1; i <= todoCount; i++) {
                const todo = await todoContract['todos'](i);
                // Convert the big int values to strings or other suitable data types
                const todoId = parseInt(todo[0]);
                const todoText = todo[1];
                const completed = todo[2];
                console.log(typeof(todoId));
                // Push the converted data to the todoList array
                todoList.push([todoId, todoText, completed]);
            }
            

            setTodos(todoList);
            localStorage.setItem('data', JSON.stringify(todoList));

            // Log the fetched todo list
            console.log("Todo List:", todoList);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    makeTodoContract();

}, []);



   const handleRemoveTodo = async ({todoId}) => {
    try {
        console.log(todos);
        // Update the todo list state by filtering out the removed task
        const updatedData = todos.filter(todo => todo[0] !== todoId);

        setTodos(updatedData);
        localStorage.setItem('data', JSON.stringify(updatedData));
        // Call the function to remove the task from the blockchain
        await removeTodo({ todoId });
        
        
    } catch (error) {
        console.error("Error removing todo:", error);
    }
};




    return (
        <>
      
        {todos.map((todo) => {
         const todoIndex = parseInt(todo[0]);
         const todoId = parseInt(todo[0]); // 1    
         const todoText = todo[1]; // 'Hello world'
         const completed = todo[2]; // false
         
        

          return (
            
            <div>
            
            <li key={todoIndex} >
                {`ID: ${todoId}, Text: ${todoText} Completed: ${completed === false}`}
            </li>
            <button onClick={() => toggleTodo({ todoId, completed })}>Done</button>
            <button onClick={() => { console.log(todoId); handleRemoveTodo({todoId}) }}>Delete Task</button>
            

            </div>
            
        );
            
          
        })}
       
        </>
   )
}