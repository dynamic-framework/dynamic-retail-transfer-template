/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import {
  DToastContainer,
  DContextProvider,
} from '@dynamic-framework/ui-react';

import './config/liquidConfig';
import './config/i18nConfig';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import ModalConfirmTransfer from './components/ModalConfirmTransfer';

import '@dynamic-framework/ui-react/dist/css/dynamic-ui.css';
import './styles/base.scss';

const root = ReactDOM.createRoot(document.getElementById('transfer') as Element);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DContextProvider
        portalName="portal"
        availablePortals={{
          modalConfirmTransfer: ModalConfirmTransfer,
        }}
      >
        <App />
        <DToastContainer
          style={{
            '--toastify-toast-width': 'auto',
          }}
        />
      </DContextProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
