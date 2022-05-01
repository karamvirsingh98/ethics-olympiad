import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./app.css";
import { setupClient } from "./util/helpers";

const DEVELOPMENT = "http://localhost:3030";
const TESTING = "https://ethicsolympiad-test.herokuapp.com";
const PRODUCTION = "https://ethicsolympiad.herokuapp.com/";

export const client = setupClient(PRODUCTION);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
