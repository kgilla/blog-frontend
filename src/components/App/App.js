import React, { useState } from "react";
import { Router } from "@reach/router";

import "./reset.css";
import "./App.css";

import Navbar from "../Navbar";
import BlogIndex from "../BlogIndex";
import BlogPost from "../BlogPost";
import Login from "../Login";
import BlogForm from "../BlogForm";

import local from "../../store/local";

function App() {
  let [user, setUser] = useState(local.getUser());
  let [message, setMessage] = useState("");

  const handleLogin = (data) => {
    let user = { id: data._id, name: data.user.fullname, token: data.token };
    setUser(user);
    local.setUser(user);
    setMessage(`Successfully logged in as ${user.name}`);
  };

  const handleLogout = () => {
    setUser("");
    local.setUser("");
    setMessage("Successfully logged out");
  };

  return (
    <div id="App">
      <Navbar user={user} handleLogout={handleLogout} />
      {message ? <div className="success">{message}</div> : null}
      {user ? (
        <Router>
          <BlogForm path="/create" user={user} />
          <BlogForm path="/:id/update" user={user} />
          <BlogForm path="/:id/delete" user={user} />
          <BlogIndex path="/" />
          <BlogPost path="/:postId" user={user} />
        </Router>
      ) : (
        <Router>
          <BlogIndex path="/" />
          <BlogPost path="/:postId" />
          <Login path="/login" handleLogin={handleLogin} />
        </Router>
      )}
    </div>
  );
}

export default App;
