import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { setupClient } from "./util/helpers";

//
import App from "./App";
import "./index.css";
import "./app.css";

export const client = setupClient("http://10.0.0.101:3030")

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
