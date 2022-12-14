import React, { useEffect, useState } from 'react';
import ConnectWidget from './utils/ConnectWidget';
import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Main from './views/Main/Main';
import NotAuth from './views/NotAuth/NotAuth';

function App() {
  // ConnectWidget('https://cdn.belvo.io/belvo-widget-1-stable.js');
  const { user } = useSelector((state: RootState) => state.auth);

  const loggedIn: boolean = !!user;



  return (
    <BrowserRouter>
      <ToastContainer />
        <>
          {loggedIn ?
            <Main />
            :
            <NotAuth />
          }  

          <div id="belvo" />

        </>
    </BrowserRouter>
  );
}

export default App;

// {isReadyForInstall ? <button onClick={downloadApp}> Download App </button> : null}
// <div id="belvo" />

/* { user?.link && <Transactions /> } */