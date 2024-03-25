import { ethers } from "ethers";


export const requestAccount = async() => {
    // Request access to the user's MetaMask account
    const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(account[1]);  
}

export const initializeProvider = () => {
    provider = new ethers.BrowserProvider(window.ethereum)
    signer = provider.getSigner();
    return new ethers.Contract(address, abi, signer);
  }
