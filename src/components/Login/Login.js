import React, { useState } from "react";
import { useNavigate } from "@reach/router";
import "./Login.css";

const Login = (props) => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    const URL = "https://api-myblog.herokuapp.com/users/login";
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    data.user ? handleUser(data) : setError(data.message);
  };

  const handleUser = async (data) => {
    props.handleLogin(data);
    await navigate("/");
  };

  const handleChange = (e) => {
    e.target.name === "username"
      ? setUsername(e.target.value)
      : setPassword(e.target.value);
  };

  const handleSubmit = () => {
    login(username, password);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit()
    }
  }

  return (
    <div className="form-container">
      <form className="form" id="login-form" onKeyDown={handleKeyDown}>
        <h2 className="form-heading">Log In</h2>
        {error ? <div className="error">{error}</div> : null}
        <div className="form-section">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="form-input"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="form-section">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-input"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="form-section">
          <button type="button" className="form-submit" onClick={handleSubmit}>
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
