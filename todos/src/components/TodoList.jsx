import { address, abi } from "../config";
import { readContract } from "../contracts/readContract";

export const TodoListComp = async() => {
    const [account, setAccount] = useState('');
    const [todos, setTodos] = useState();


     const initializeProvider = () => {
        const provider = new ethers.provider.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        return new ethers.Contract(address, abi, signer);
    }
     const initializeReadContract = () => {
        const provider = new ethers.provider.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        return new ethers.Contract(address, abi, signer);
    }

    async function requestAccount () {
        const account = await window.ethereum.request({ method: 'ethRequestAccount'});
        setAccount(account[0]);
    }

    async function fetchTodos() {
        if(typeof window.ethereum !== 'undefined'){
            const contract = initializeReadContract();
        try {
           const indexes = await readContract['getIndexList']();
           console.log(indexes);
        } catch (error) {
            console.log('error indexes', error);
        }
    }

}
    
    

    //const todoList = await readContract['getIndexList']();

    /*const temp = [];

    todoList.forEach(async(i) => {
        const todo = await readContract['todos'](i);
        temp.push(todo)
    })

    setTodos(temp)*/

    return (
        <>
            {todoList.map(()=> {

            })}

        </>
    )
}