import React from "react";
import { Router } from "@reach/router";
import "./reset.css";
import "./App.css";

import Navbar from "../Navbar";
import BlogIndex from "../BlogIndex";
import BlogPost from "../BlogPost";
import Login from "../Login";
import BlogForm from "../BlogForm";

function App() {
  return (
    <div id="App">
      <Navbar />
      <Router>
        <BlogIndex path="/" />
        <BlogPost path="/:postId" />
        <Login path="/login" />
        <BlogForm path="/create" />
      </Router>
    </div>
  );
}

export default App;
