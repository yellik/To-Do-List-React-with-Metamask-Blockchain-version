import { ethers } from "ethers";

const [account, setAccount] = useState(null);
    const [todos, setTodos] = useState([]);
    const [writeTodos, setWriteTodos] = useState()
    const [readContract, setReadContract] = useState();

    
   
    const emptyAddress = '0x0000000000000000000000000000000000000000';
    let provider;
    let signer;

 
    const requestAccount = async () => {
      try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts);
          console.log(accounts);
      } catch (error) {
          console.error('Error requesting accounts:', error);
          // Handle errors here if needed
      }

      console.log(provider);
    }
/*
    if(!window.ethereum){
      console.log('could not find a web3 wallet');
  }else if(window.ethereum === 'undefined'){
    initializeProvider();
  }else{
    requestAccount();
  }*/
    useEffect(() => {
   
      const makeContract = async () => {
        
        if (typeof window.ethereum !== 'undefined') {
          const contract = await initializeProvider();
        }
        /* 
          try {
            
              //Initialize the read contract
             const todos = contract(
                  address,
                  abi,
                  window.ethereum
              );
              setTodos(todos);
                console.log(todos);
              // define datatype on abi
       
              console.log(abi);
              console.log(typeof(abi));
              console.log(abi.length);
              
              //fetch data from abi
              const getIndexList = async() => {
                const temp = [];
                abi.forEach((item) => {
                    temp.push(item);
                });
                console.log(temp);
                console.log(temp[5]);
            };
            getIndexList();

            
          } catch (error) {
              console.error('Error initializing contract or fetching todos:', error);
              // Handle errors here if needed
          }
      
          const signer = await provider.getSigner();
*/
          const writeContract = new ethers.Contract(
            address,
            abi,
            signer
        );
        /*

        const writeTodos = async() => {
          if (typeof window.ethereum !== 'undefined') {
            const writeContract = await initializeProvider();
        }
          const writeTodos = await writeContract(
            address,
            abi,
            signer
          )
        setWriteTodos(writeTodos)
*/
        try {
          const result = await writeContract.createTodo("", 0, true);
          
          await result.wait();
          console.log(result);

        } catch (error) {
          console.log('there was an error in getting todos', todos);
        }
      

      writeTodos()
    };
      // Request account from MetaMask
      
      requestAccount();
      makeContract();
  }, []);


  return (
    <div>
       <MetaMask/>
    </div>
);

}