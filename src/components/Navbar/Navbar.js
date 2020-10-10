import React from "react";
import "./Navbar.css";

import { Link } from "@reach/router";

const Navbar = (props) => {
  const handleLogout = () => {
    props.handleLogout();
  };

  return (
    <div id="nav-container">
      {props.user ? (
        <nav id="main-nav">
          <Link to="/">
            <button id="main-nav-brand" className="nav-link">
              My Blog
            </button>
          </Link>
          <div id="nav-links">
            <Link to="/create">
              <button className="nav-link">New Blog Post</button>
            </Link>
            <button className="nav-link">Contact</button>
            <button className="nav-link" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </nav>
      ) : (
        <nav id="main-nav">
          <Link to="/">
            <button id="main-nav-brand" className="nav-link">
              My Blog
            </button>
          </Link>
          <div id="nav-links">
            <Link to="/login">
              <button className="nav-link">Login</button>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
