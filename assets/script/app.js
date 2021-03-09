import ReactDOM from "react-dom";
import React from "react";
import Navbar from "./components/Navbar";
import ListImages from "./components/ListImages";
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <>
      <Navbar />
      <Login />
      <ListImages />
    </>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
