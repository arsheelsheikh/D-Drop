import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import Header from './components/Header';
import Uploader from './components/Uploader';

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
        <div className='container'>
          <div className='row'>
            <h1 className='text-center my-5 text-gradient'>
              The Power of Decentralization Meets Ease of Use with D-Drop
            </h1>
            <div className='bg'></div>
            <div className='bg bg2'></div>
            <div className='bg bg3'></div>
            <Uploader wallet={wallet} provider={provider} contract={contract} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
