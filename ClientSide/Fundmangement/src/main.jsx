import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// const clientId = import.meta.env.VITE_CLIENT_ID;

// console.log(clientId); // Ensure this logs the correct client ID

ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="496937648657-nmdgnmp32lm37u5nr11sl6crottlpn6a.apps.googleusercontent.com">
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </GoogleOAuthProvider>
);
