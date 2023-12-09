import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-n83sckv1u768rsp5.us.auth0.com"
    clientId="CyiITRYJ9gtFLKcvoZC2DFRhi9LLWvkp"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  	<BrowserRouter>
  		<App />
    </BrowserRouter>
  </Auth0Provider>
)