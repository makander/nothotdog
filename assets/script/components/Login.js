import { useEffect, useState } from "react";
import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

const Login = ({ loginUser }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("click");
    const body = { username, password };
    loginUser(body);
  };

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
