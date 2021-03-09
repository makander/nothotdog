import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loginUser } from "../actions/";

const Login = () => {
  const [state, setState] = useState({ token: "" });
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("click");
    const body = { username, password };
    console.log(body);
    axios({
      method: "post",
      url: "http://localhost:8080/api/auth/login/",
      data: {
        username,
        password,
      },
    }).then((res) => {
      loginUser(res.data.key);
      //payload: res.data.key,
    });
  };
  //setState({ ...state, token: res.data.key }));

  return (
    <>
      <form>
        <label>Username:</label>
        <input
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter username"
        ></input>
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        ></input>
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(null, mapDispatchToProps)(Login);
