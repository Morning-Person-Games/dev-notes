import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ setToken }) {
  const [message, setMessage] = useState(null);
  const host = window.location.host;
  let redirect = host === "localhost:3080" ? false : true;
  useEffect(() => {
    if (window.location.hash) {
      var search = new URLSearchParams(window.location.hash.substring(1));
      var token = search.get("access_token");
      if (token !== null) {
        setToken(token);
        setMessage({
          text: "Succesfully logged in!",
          options: { type: toast.TYPE.SUCCESS },
        });
      } else {
        const NoTokenError = () => (
          <div>
            No token was found. Try again <Link to="/login">here.</Link>
          </div>
        );
        setMessage({
          text: NoTokenError,
          options: { type: toast.TYPE.ERROR, autoClose: false },
        });
      }
    }
  }, [setToken, setMessage]);
  if (message) {
    toast(message.text, message.options);
    if (redirect) {
      return <Navigate to="/" />;
    }
    setMessage(null);
  }
}

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
