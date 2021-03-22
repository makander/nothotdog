import { Route, Redirect } from "react-router-dom";
import React from "react";

function PrivateRoute({ children, ...rest }) {
  const authed = localStorage.getItem("userToken");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authed ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
