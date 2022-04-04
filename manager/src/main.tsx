import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { setupClient } from "./util/helpers";
import App from "./App";
import "./index.css";
import "./app.css";

const HOME_IP = "http://10.0.0.44:3030";
const MAX_HOME_IP = "http://10.0.0.43:3030"
const LOCALHOST = "http://localhost:3030"

export const client = setupClient("https://ethicsolympiad.herokuapp.com/")

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
