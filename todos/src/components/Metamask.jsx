import { SocketProvider, ethers } from "ethers";
import { address, abi } from "../config";
import { useState } from "react";
import { requestAccount } from "../scripts/accountScripts";

export const MetaMask = () => {
   const [account, setAccount] = useState();


   const connectToMetamask = () => {
   
    const requestAccount = async() => {
        // Request access to the user's MetaMask account
        const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(account[1]);  
    }
    requestAccount()
    console.log(account);
   }
   
   
    return (
        <>
            <button onClick={connectToMetamask }>Connect to MetaMask</button>
        </>
    );
}



