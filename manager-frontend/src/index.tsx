import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import feathers from "@feathersjs/feathers"
import rest from "@feathersjs/rest-client"

export const client = feathers()
const restClient = rest("http://localhost:3030")
client.configure(restClient.fetch(window.fetch));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
