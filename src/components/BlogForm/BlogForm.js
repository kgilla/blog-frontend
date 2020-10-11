import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { navigate } from "@reach/router";

import "./BlogForm.css";

import Loader from "../Loader";

const BlogForm = (props) => {
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [blurb, setBlurb] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [mode, setMode] = useState("create");

  useEffect(() => {
    const getPost = async (id) => {
      setIsLoading(true);
      const URL = `https://api-myblog.herokuapp.com/posts/${id}`;
      const response = await fetch(URL);
      const data = await response.json();
      setTitle(data.post.title);
      setBlurb(data.post.blurb);
      setContent(data.post.content);
      setIsLoading(false);
    };
    const init = () => {
      if (props.path === "/:id/update" && mode !== "update") {
        setMode("update");
        getPost(props.id);
      } else if (props.path === "/:id/delete" && mode !== "delete") {
        setMode("delete");
        getPost(props.id);
      }
    };
    init();
  }, [props.path]);

  const create = async () => {
    setIsLoading(true);
    const URL = "https://api-myblog.herokuapp.com/posts/create";
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.user.token}`,
      },
      body: JSON.stringify({ title, content }),
    });
    const data = await response.json();
    setIsLoading(false);
    navigate(`/${data.post._id}`);
  };

  const update = async () => {
    setIsLoading(true);
    const URL = `https://api-myblog.herokuapp.com/posts/${props.id}/update`;
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.user.token}`,
      },
      body: JSON.stringify({ title, content }),
    });
    await response.json();
    setIsLoading(false);
    navigate(`/${props.id}`);
  };

  const destroy = async () => {
    setIsLoading(true);
    const URL = `https://api-myblog.herokuapp.com/posts/${props.id}/delete`;
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.user.token}`,
      },
    });
    await response.json();
    setIsLoading(false);
    navigate("/");
  };

  const handleEditorChange = (e) => {
    setContent(e.target.getContent());
  };

  const handleChange = (e) => {
    let a = e.target.value;
    e.target.name === "title" ? setTitle(a) : setBlurb(a);
  };

  const handleSubmit = () => {
    if (mode === "create") {
      create();
    } else if (mode === "update") {
      update();
    } else if (mode === "delete") {
      destroy();
    }
  };

  return (
    <div className="form-container">
      {isLoading ? <Loader /> : null}
      <div id="blog-form">
        <h2 className="form-heading">
          {" "}
          {mode === "create"
            ? "Create Blog Post"
            : mode === "update"
            ? "Update Blog Post"
            : "Delete Blog Post"}
        </h2>
        <div className="form-section">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="form-input"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="form-section">
          <label htmlFor="blurb" className="form-label">
            Blog Blurb
          </label>
          <textarea
            name="blurb"
            className="form-input form-textarea"
            value={blurb}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-section">
          <Editor
            apiKey="abh3yg0xpuwi7wp76gc8etjalbd4yg93ib50ubokso0npxiq"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image",
                "charmap print preview anchor help",
                "searchreplace visualblocks code",
                "insertdatetime media table paste wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic | \
              alignleft aligncenter alignright | \
              bullist numlist outdent indent | help",
            }}
            onChange={handleEditorChange}
            value={content}
          />
        </div>
        <button type="button" className="form-submit" onClick={handleSubmit}>
          {mode === "create"
            ? "Create Blog Post"
            : mode === "update"
            ? "Update Blog Post"
            : "Delete Blog Post"}
        </button>
      </div>
    </div>
  );
};

export default BlogForm;
