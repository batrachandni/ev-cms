import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./app";

ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
