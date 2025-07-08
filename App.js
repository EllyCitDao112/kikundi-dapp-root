import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [wallet, setWallet] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        const bal = await provider.getBalance(userAddress);
        setWallet(provider);
        setAddress(userAddress);
        setBalance(ethers.formatEther(bal));
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    } else {
      alert("Please install MetaMask to use this app.");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', color: 'white', backgroundColor: '#0e0e0e', minHeight: '100vh' }}>
      <h1>Kikundi DApp</h1>
      {!address ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>✅ Connected: {address}</p>
          <p>💰 Balance: {balance} ETH</p>
        </div>
      )}
    </div>
  );
}

export default App;
