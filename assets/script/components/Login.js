import { useEffect, useState } from "react";
import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

const Login = ({ loginUser }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { username, password };
    loginUser(body);
  };

  return (
    <>
      <div className="form-container upload">
        <h2>Login</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Username</label>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter username"
            ></input>
          </div>

          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            ></input>
          </div>

          <button type="submit">Login </button>
        </form>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(null, mapDispatchToProps)(Login);
