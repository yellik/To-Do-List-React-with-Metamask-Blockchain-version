import { ethers } from "ethers";
import "./App.css";
import { MetaMask } from "./components/Metamask";
import { useState, useEffect } from "react";
import { abi, address } from "./config";
import { handleDone } from "./scripts/handlers";
import { writeContract } from "./contracts/writeContract";
import { initializeProvider } from "./scripts/accountScripts";

function App() {
const [todos, setTodos] = useState([])
const [account, setAccount] = useState()
const [writeContract, setWriteContract] = useState();
const [readContract, setReadContract] = useState();

  let provider;
  let signer;

  const initializeReadProvider = () => {
    provider = new ethers.BrowserProvider(window.ethereum)
    
   
  }
  
   const initializeProvider = async() => {
    provider = new ethers.BrowserProvider(window.ethereum)
    signer = await provider.getSigner()
   
  }

 if(!window.ethereum){
    console.log(`We coudln't find a Web3 wallet. Please install a wallet that supports ethereum`);
 } 

useEffect(() => {
   
  const makeReadContract = async() => {
        
    console.log(provider)
    if(ethereum.window === 'undefined'){
      initializeReadProvider();
      
    
    }
    console.log(provider)

    const myReadContract = new ethers.Contract(
      address,
      abi,
      provider
          )
      setReadContract(myReadContract);
      console.log(myReadContract);
      console.log(await myReadContract.getAddress());
      
      const count = await myReadContract['todoCount']();
      console.log(count); 

      const todos = [];
      for (let i = 1; i <= count; i++) {
        const todo = await myReadContract['todos'](i);
        todos.push(todo);
        console.log(todo);
        console.log(todos.length); //(should be the same as count)
       
      }
      
    setTodos(todos)

  

    }
  
     makeReadContract()

     const makeWriteContract = async () => {
      if (typeof window.ethereum !== "undefined") {
        initializeProvider();
      }
  
      const initiazeWriteContract = async () => {
        signer = await provider.getSigner();
        const myWriteContract = new ethers.Contract(
          address,
          abi,
          signer
        );
        setWriteContract(myWriteContract);
        console.log(myWriteContract.getAddress());
      };
  
      initiazeWriteContract();
    };
  
    makeWriteContract();
      }, [])
      
      
    
      const addTodo = async () => {
        try {
          const result = await writeContract.createTodo("add a new todo");
          await result.wait();
          console.log(result);
        } catch (error) {
          console.log("there was an error in adding todo", error);
        }
      };
    

return (
  

    <div>
      <ul >

        {todos.map((todo) => {
          const todoIndex = todo[0];
          const todoId = todo[0]; // 1    
          const todoText = todo[1]; // 'Hello world'
          const completed = todo[2]; // false
         
          return (
          
          <div>
            <li key={todoIndex} >
              {`ID: ${todoId}, Text: ${todoText} `}
            </li>
            <button provider={provider} signer={signer} onClick={handleDone}>{`DONE: ${completed}`}</button>
            <button>Delete</button>
          </div>  
          )
        })}
      </ul>
    <button onClick={addTodo}>Add to do</button>
     <MetaMask/>
  </div>
  )
}
export default App;
