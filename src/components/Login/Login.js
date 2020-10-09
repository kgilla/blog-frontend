import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  const handleChange = (e) => {
    e.target.name === "username"
      ? setUsername(e.target.value)
      : setPassword(e.target.value);
  };

  const handleSubmit = () => {
    console.log(username, password);
  };

  return (
    <div className="form-container">
      <form className="form">
        <h2 className="form-heading">Log In</h2>
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
            type="text"
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
