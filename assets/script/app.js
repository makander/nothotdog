import "regenerator-runtime/runtime";
import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ListImages from "./components/ListImages";
import Login from "./components/Login";
import ImageDetail from "./components/ImageDetail";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <>
      <Navbar />
      <ListImages />
    </>
    /*   <Switch>
      <Navbar />
      <Route path={"/"} exact component={ListImages} />
      <Route path={"/login"}>
        <Login />
      </Route>
      <Route path={"/images/:id"}>
        <ImageDetail />
      </Route>
    </Switch> */
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
