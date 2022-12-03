import React from 'react';
import ReactDOM from 'react-dom/client';
// CSS
import './index.css';
import App from './App';
// Router (Navigation)
import { BrowserRouter } from "react-router-dom"
// Redux
import { Provider } from 'react-redux';
import store from "./redux/store"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

