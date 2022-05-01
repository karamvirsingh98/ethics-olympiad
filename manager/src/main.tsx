import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { setupClient } from "./util/helpers";
import App from "./App";
import "./index.css";
import "./app.css";

const LOCALHOST = "http://localhost:3030";
const HEROKU = "https://ethicsolympiad.herokuapp.com/";
const TESTING = "https://ethicsolympiad-test.herokuapp.com";


export const client = setupClient(TESTING);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
