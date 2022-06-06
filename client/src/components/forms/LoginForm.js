import React, { useState } from "react";
import PropTypes from "prop-types";

function LoginForm({ setToken }) {
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      password,
    });
    setToken(token);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Password</p>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};

async function loginUser(credentials) {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
