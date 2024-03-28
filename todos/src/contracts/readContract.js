import { useState } from "react";
import { abi, address } from "../config";
import { ethers } from "ethers";

export const readContract = () => {
    const [readContract, setReadContract] = useState();
    const myReadContract = new ethers.Contract(
    address,
        abi,
        window.ethereum
    )
setReadContract(myReadContract)
}
    

