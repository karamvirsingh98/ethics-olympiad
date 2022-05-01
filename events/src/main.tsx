import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./app.css";
import { setupClient } from "./util/helpers";

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
