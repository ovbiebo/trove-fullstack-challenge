import React from 'react';
import ReactDOM from 'react-dom';
import "react-toastify/dist/ReactToastify.css";
import './index.css';
import App from './app';
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App/>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
