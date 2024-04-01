import { address } from "../config";
import { ethers } from "ethers";

export const writeContract = async() => {

const [writeContract, setWriteContract] = useState();

const signer = await provider.getSigner();
const myWriteContract = new ethers.Contract(
    address,
    abi,
    signer
)
setWriteContract(myWriteContract);
}




try {
    const result = await myWriteContract.createTodo("", 0, true);
      
    await result.wait();
    console.log(result);

    } catch (error) {
      console.log('there was an error in getting todos', error);
    }
  

   
  

