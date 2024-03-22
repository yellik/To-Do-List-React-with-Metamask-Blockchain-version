import { ethers } from "ethers";
import "./App.css";
import { MetaMask } from "./components/Metamast";
import { useState, useEffect } from "react";
import { abi, address } from "./config";

function App() {
    const [account, setAccount] = useState('');
    const [todos, setTodos] = useState([]);
    const [readContract, setReadContract] = useState();

    useEffect(() => {
      const makeContract = async () => {
          try {
              // Initialize the read contract
              const todos = new ethers.Contract(
                  address,
                  abi,
                  window.ethereum
              );
              setTodos(todos);

              // Fetch todos count from the contract
       
              console.log(abi);
              console.log(typeof(abi));
              console.log(abi.length);

              const getIndexList = async() => {
                const temp = [];
                abi.forEach((item) => {
                    temp.push(item);
                });
                console.log(temp);
                
            };
            
            getIndexList();
          
            console.log(getIndexList.todoCount());
            

            
          } catch (error) {
              console.error('Error initializing contract or fetching todos:', error);
              // Handle errors here if needed
          }
      };
      // Request account from MetaMask
      const requestAccount = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
        } catch (error) {
            console.error('Error requesting accounts:', error);
            // Handle errors here if needed
        }
    };
      requestAccount();
      makeContract();
  }, []);


        
    return (
        <div>
            <h1>Todos</h1>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo.text}</li>
                ))}
            </ul>
            <MetaMask />
        </div>
    );
}

export default App;
