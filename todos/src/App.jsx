import { ethers } from "ethers";
import "./App.css";
import { MetaMask } from "./components/Metamask";
import { useState, useEffect } from "react";
import { abi, address } from "./config";
import { writeContract } from "./contracts/writeContract";
import { initializeProvider } from "./scripts/accountScripts";

function App() {
const [account, setAccount] = useState()
const [writeContract, setWriteContract] = useState();
const [readContract, setReadContract] = useState();

  let provider;
  let signer;

  const initializeReadProvider = () => {
    provider = new ethers.BrowserProvider(window.ethereum)
    
   
  }
  
  const initializeProvider = () => {
    provider = new ethers.BrowserProvider(window.ethereum)
    
   
  }
  

 if(!window.ethereum){
    console.log(`We coudln't find a Web3 wallet. Please install a wallet that supports ethereum`);
 } 

 
 
    

useEffect(() => {
   
  const makeReadContract = async() => {
        
    console.log(provider)
    if(ethereum.window === 'undefined'){
      initializeReadProvider
      
    
    }
    console.log(provider)

    const myReadContract = new ethers.Contract(
      address,
      abi,
      provider
          )
      setReadContract(myReadContract);
      console.log(myReadContract);
      console.log(myReadContract.getAddress());
      
      const count = await myReadContract.todoCount()
      console.log(count);
      
      
     
      
    
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
    
    <button onClick={addTodo}>Add to do</button>
     <MetaMask/>
  </div>
  )
}
export default App;
