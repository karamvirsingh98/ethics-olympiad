import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import feathers from "@feathersjs/feathers"
import rest from "@feathersjs/rest-client"
import auth from "@feathersjs/authentication-client"
import { BrowserRouter } from 'react-router-dom'

export const client = feathers()
const restClient = rest("http://10.0.0.101:3030")
client.configure(restClient.fetch(window.fetch));
client.configure(auth())


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
