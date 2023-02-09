import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { trunc } from '../helper/common';

const Header = ({ wallet }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-glass'>
      <div className='col-12'>
        <h1 className='text-center m-0 fw-bolder'>D-drop</h1>
        <span className={`badge customBadge positioned ${wallet ? 'bg-success' : 'bg-danger'}`}>
          {wallet ? trunc(wallet, 20) : 'Wallet not connected'}
        </span>
      </div>
    </nav>
  );
};

export default Header;
