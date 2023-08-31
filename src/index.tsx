import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import '@dynamic-framework/ui-react/dist/css/dynamic-ui-all.css';

import {
  DToastContainer,
  LiquidContextProvider,
  ModalContextProvider,
} from '@dynamic-framework/ui-react';

import './styles/base.scss';
import './config/liquidConfig';
import './config/i18nConfig';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import ModalConfirmTransfer from './components/ModalConfirmTransfer';

const root = ReactDOM.createRoot(document.getElementById('transfer') as Element);
root.render(
  <React.StrictMode>
    <LiquidContextProvider>
      <Provider store={store}>
        <ModalContextProvider
          portalName="modalPortal"
          availableModals={{
            confirmTransfer: ModalConfirmTransfer,
          }}
        >
          <App />
          <DToastContainer
            style={{
              '--toastify-toast-width': 'auto',
            }}
          />
        </ModalContextProvider>
      </Provider>
    </LiquidContextProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
