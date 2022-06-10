import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ setToken }) {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    if (window.location.hash) {
      var search = new URLSearchParams(window.location.hash.substring(1));
      var token = search.get("access_token");
      if (token !== null) {
        setToken(token);
        setAuthenticated(true);
      } else {
        const NoTokenError = () => (
          <div>
            No token was found. Try again{" "}
            <Link to="/oauth/authenticate">here.</Link>
          </div>
        );
        toast.error(NoTokenError);
      }
    } else {
      const NoHashError = () => (
        <div>
          No hash was found to get access token from. Try again{" "}
          <Link to="/oauth/authenticate">here.</Link>
        </div>
      );
      toast.error(NoHashError, { autoClose: false });
    }
  }, [setToken, setAuthenticated]);
  if (authenticated) {
    toast.success("Login successful!");
    return <Navigate to="/" />;
  } else {
    return <h3>Logging in...</h3>;
  }
}

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

// async function loginUser(credentials) {
//   return fetch("/api/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   }).then((data) => data.json());
// }
