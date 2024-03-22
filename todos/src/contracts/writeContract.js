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
return myWriteContract;
}