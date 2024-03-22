import { ethers } from "ethers";


export const MetaMask = () => {
    const connectToMetaMask = async () => {
        console.log(window.ethereum);
            // Check if MetaMask is installed
            if (!window.ethereum) {
                console.error('We could not find a web3 wallet.');
                return;
            }

            // Check if MetaMask is already connected
            if (window.ethereum !== undefined) {
                console.log('MetaMask is already connected:', window.ethereum);

                return;
            }

            // Request access to the user's MetaMask account
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Set up MetaMask
            const provider = new ethers.providers.Web3Provider(window.ethereum);

       
            
    };

    const printDetails = () => {
        console.log('Connected to MetaMask', provider);
        console.log(`Contract address: ${contract.address}`);
        console.log('Contract ABI', JSON.stringify(contract.interface.abi));
    }

    return (
        <>
         
            <button onClick={connectToMetaMask}>Connect to MetaMask</button>
        </>
    );
};
