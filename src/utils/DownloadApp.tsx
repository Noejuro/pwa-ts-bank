import { useEffect, useState } from "react";

export default function DownloadApp() {

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
        <>
            {
                isReadyForInstall && 
                    <button type="button" className="btn btn-light" onClick={downloadApp}> Download App </button>
            }
        </>
    )
}