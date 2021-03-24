import "regenerator-runtime/runtime";
import ReactDOM from "react-dom";
import React from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ListImages from "./components/ListImages";
import Login from "./components/Login";
import ImageDetail from "./components/ImageDetail";
import Upload from "./components/Upload";
import { Provider } from "react-redux";
import store from "./store/store";
import EditImage from "./components/EditImage";
import axios from "axios";
import PrivateRoute from "../script/protectedRouter";
import Profile from "./components/Profile";
import history from "./history.js";

/* axios.interceptors.request.use((request) => {
  console.log("Starting Request", JSON.stringify(request, null, 2));
  return request;
}); */

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path={"/"} exact component={ListImages} />
        <Route exact path={"/login/"} exact component={Login} />
        <Route path={"/images/:id"} exact component={ImageDetail} />
        <Route path={"/upload"} exact component={Upload} />
        <Route path={"/images/edit/:id"} exact component={EditImage} />
        <PrivateRoute>
          <Profile path="/profile" />
        </PrivateRoute>
      </Switch>
    </>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
