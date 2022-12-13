import React, { useEffect, useState } from 'react';
import ConnectWidget from './utils/ConnectWidget';
import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Transactions from './views/Main/Transactions/Transactions';

function App() {
  // ConnectWidget('https://cdn.belvo.io/belvo-widget-1-stable.js');
  const { user } = useSelector((state: RootState) => state.auth);

  const [isReadyForInstall, setIsReadyForInstall] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }



  return (
    <div className="App">
      
      <header className="App-header">

        {isReadyForInstall ? <button onClick={downloadApp}> Download App </button> : null}
        <div id="belvo" />

        { user?.link && <Transactions /> }

        

      </header>
    </div>
  );
}

export default App;
