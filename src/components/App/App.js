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
    // local.setUser(user);
    // setMessage(`Successfully logged in as ${user.name}`);
  };

  const handleLogout = () => {
    setUser("");
    local.setUser("");
    setMessage("Successfully logged out");
  };

  return (
    <div id="App">
      <Navbar user={user} handleLogout={handleLogout} />
      <Router>
        <BlogForm path="/posts/create" user={user} />
        <BlogForm path="/posts/:id/update" user={user} />
        <BlogForm path="/posts/:id/delete" user={user} />
        <BlogIndex path="/" user={user} default />
        <BlogPost path="/posts/:postID" user={user} />
        <Login path="/login" handleLogin={handleLogin} />
      </Router>
    </div>
  );
}

export default App;
