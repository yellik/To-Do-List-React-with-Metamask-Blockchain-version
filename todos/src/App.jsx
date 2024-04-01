import { ethers } from "ethers";
import "./App.css";
import { MetaMask } from "./components/Metamask";
import { useState, useEffect } from "react";
import { abi, address } from "./config";

import { TodoListComp } from "./components/TodoList";
import { writeContract } from "./contracts/writeContract";
import { initializeProvider } from "./scripts/accountScripts";

function App() {
  const [todos, setTodos] = useState([]);
  const [account, setAccount] = useState();
  const [writeContract, setWriteContract] = useState();
  const [readContract, setReadContract] = useState();

  let provider;
  let signer;

  const initializeReadProvider = () => {
    provider = new ethers.BrowserProvider(window.ethereum);
    return provider;
  };
  const initializeProvider = async () => {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
  };

  if (!window.ethereum) {
    console.log(
      `We coudln't find a Web3 wallet. Please install a wallet that supports ethereum`
    );
  }

  useEffect(() => {
    const makeFetchTodo = async () => {
      if (window.ethereum === "undefined") {
        initializeReadProvider();
      }
      console.log(provider);
      const todosContract = new ethers.Contract(address, abi, await provider);// ==> const contract = new 
      console.log(provider); //make sure provider is present
      console.log(todosContract);

      const todoCount = await todosContract["todoCount"]();//return the number of todos
      //const existingTodos = await todos["todos"]();//return an array of todo data //index//text//bool
      console.log(todoCount);
      const fetchTodoList = new ethers.Contract(address, abi, await provider);
      console.log(provider);
      console.log(fetchTodoList);
      const existingTodos = todosContract['todos']();
      
      console.log(existingTodos);
      try{
       const todoList = [];
        for (let i = 1; i <= todoCount; i++) {
            const todo = await todosContract['todos'](i);
            todoList.push(todo);
        }

        // Log the fetched todo list
        console.log("Todo List:", todoList);
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
    };
    makeFetchTodo();

    
  }, []);

  

  return (
    <div>
     
      <TodoListComp />
      <MetaMask />
    </div>
  );
}
export default App;
