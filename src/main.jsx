import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

//IMPORT REACT-REDUX PROVIDER
import { Provider } from 'react-redux';
//IMPORT STORE
import store from './store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* PROVIDE STORE */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
