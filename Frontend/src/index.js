import React from 'react';
//import ReactDOM from 'react-dom/client';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';


//const root = ReactDOM.createRoot(document.getElementById('root'));
const root = document.getElementById('root');
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>, root);

