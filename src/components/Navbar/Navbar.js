import React from "react";
import "./Navbar.css";

import { Link } from "@reach/router";

const Navbar = () => {
  return (
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
        <button className="nav-link">Blog Posts</button>
        <button className="nav-link">Contact</button>
      </div>
    </nav>
  );
};

export default Navbar;
