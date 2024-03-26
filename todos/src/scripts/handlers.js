import { ethers} from "ethers"

import { initializeProvider } from "./accountScripts"



export const handleDone = async({provider, signer}) => {
   
   
    if(window.ethereum === 'undefined'){
    initializeProvider()
   }
  
    console.log(provider);
    console.log(signer);
   
}