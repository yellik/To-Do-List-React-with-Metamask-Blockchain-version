import { ethers} from "ethers"
import { address, abi } from "../config";

const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(provider);
    console.log(signer);
    const writeContract = new ethers.Contract(
        address,
        abi,
        signer
    );


export const toggleTodo = async ({todoId}) => {
    const makeToggleTodo = async() => {
console.log(writeContract);
    try {
        // Call the contract function to toggle the todo status
        console.log(todoId);
        const result = await writeContract.toggleTodo(todoId);
        await result.wait(); 
        console.log(result);
    } catch (error) {
        console.error('There was an error toggling the todo status:', error);
    }
}
makeToggleTodo()
}


export const addTodo = async({inputValue}) => {
   

try {
    const result = await writeContract.createTodo(inputValue);
    await result.wait();
   
} catch (error) {
    console.log("There was an error in adding todo", error);
}
addTodo()
}

export const removeTodo = async({todoId}) => {
    try {
        const result = await writeContract.removeTodo(todoId)
        await result.wait();
    } catch (error) {
       console.log("There was an error in removing todo", error); 
    }
   removeTodo()

}

