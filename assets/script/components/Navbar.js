import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_SUCCESS, REQUEST_LOGOUT } from "../actions/actionTypes";
import { logoutUser } from "../actions/authActions";
const Navbar = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.user.authenticated);
  const authed = localStorage.getItem("userToken");

  useEffect(() => {
    if (authed && !counter) {
      dispatch({ type: LOGIN_SUCCESS });
    }
  }, [dispatch]);

  return (
    <div className="Navbar">
      <div className="logo-container">
        <img src="/static/images/logo.svg" />
      </div>

      <div className="container">
        <Link to="/">Photos</Link>
        {authed ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/upload">Upload</Link>
            <Link onClick={() => dispatch(logoutUser())} to="/">
              Logout
            </Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
