import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import Header from './components/Header';

function App() {
  const [wallet, setWallet] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });

        window.ethereum.on('accountsChanged', () => {
          window.location.reload();
        });
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWallet(address);

        setContract(contract);
        setProvider(provider);
      } else {
        console.error('Metamask is not installed');
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
      <Header wallet={wallet} />

      <div className='App'>
        <h1 className='text-center my-4 text-gradient'>
          The Power of Decentralization Meets Ease of Use with D-Drop
        </h1>
        <div class='bg'></div>
        <div class='bg bg2'></div>
        <div class='bg bg3'></div>
      </div>
    </>
  );
}

export default App;
