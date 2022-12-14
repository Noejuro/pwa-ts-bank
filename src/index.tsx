import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { store } from './store'
import { Provider } from 'react-redux';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import axios from 'axios';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
// import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = 'https://pwa-ts-bank-api-production.up.railway.app/api';

axios.interceptors.request.use(request => {
    // Edit request config
    return request;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    // Edit response config
    return response;
}, error => {
    return Promise.reject(error);
});

const theme = createTheme({
  palette: {
     primary: {
        main: "#537895"
      },
     secondary: {
        main: "#09203f"
     }
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register({
  onUpdate: async (registration : any) : Promise<void> => {
    if (registration && registration.waiting) {
      await registration.unregister();
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  },
});
