import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const Navbar = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.user.authenticated);
  const authed = localStorage.getItem("userToken");

  //axios.defaults.headers.common["Authorization"] = { authed };

  useEffect(() => {
    console.log(authed);
    if (authed && !counter) {
      dispatch({ type: "LOGIN_SUCCESS" });
      //axios.defaults.headers.common["Authorization"] = `Token ${authed}}`;
    }
  }, [dispatch]);

  return (
    <div className="Navbar">
      <div className="logo-container">
        <img src="/assets/style/logo.svg" />
        <h1>!hotdog</h1>
      </div>

      <div className="container">
        <Link to="/">Photos</Link>
        {authed ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/upload">Upload</Link>
            <Link to="/">Logout</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
