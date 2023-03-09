import logo from './logo.svg';
import './App.css';
//adding 
import { ABI } from './constant';
import { useState, useEffect } from "react";
import { ethers } from 'ethers';

function App() {
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  
  //first check if metamask or other wallet that injects window.eth is installed on user broswer and request accounts and network id
  const connectWallet = async () => {
    //Check if MM is installed in browser
    if(typeof window.ethereum !== "undefined") {
      await window.ethereum.enable(); //this opens the metamask
      const accounts = await window.ethereum.request({method:'eth_accounts'});
      const chainId = await window.ethereum.request({method: 'eth_chainId'}); //mainnet, goerli, etc have different chain IDs
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const newSigner = provider.getSigner()
      setAccount(accounts[0]);
      setContract(new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", ABI, newSigner));
    }
    else{
      console.log("Please install metamask")
    }
  };
  
  useEffect(() => {connectWallet()}, []);
  
  console.log(contract);

  return (
    <div className='App'>
      <h1>Matching Pennies</h1>
      <p>Connect your wallet to play</p>
      {!account && <div>Connecting to wallet...</div>}
      {account && <div>Connected with account: {account}</div>}
      {contract && <div>Contract: {contract.address}</div>}
    </div>
  );
}

export default App;
