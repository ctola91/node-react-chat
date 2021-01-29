import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./routes";
import reportWebVitals from './reportWebVitals';
            
import './index.css';

const rootElement = document.getElementById("root");

const renderApp = (Component) => {
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Component />
      </Router>
    </React.StrictMode>,
    rootElement
  );
};

renderApp(AppRoutes);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
