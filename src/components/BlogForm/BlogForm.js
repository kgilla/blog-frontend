import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "@reach/router";

import "./BlogForm.css";

import Loader from "../Loader";
import { BASE_URL } from "../../const";

const BlogForm = (props) => {
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [blurb, setBlurb] = useState("");
  let [blurbImage, setBlurbImage] = useState("");
  let [blurbImageAlt, setBlurbImageAlt] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [mode, setMode] = useState("create");

  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async (id) => {
      setIsLoading(true);
      const URL = `${BASE_URL}/posts/${id}`;
      const response = await fetch(URL);
      const data = await response.json();
      setTitle(data.post.title);
      setBlurb(data.post.blurb);
      setContent(data.post.content);
      setBlurbImage(data.post.blurbImage);
      setBlurbImageAlt(data.post.blurbImageAlt);
      setIsLoading(false);
    };
    const init = () => {
      if (props.path === "/posts/:id/update" && mode !== "update") {
        setMode("update");
        getPost(props.id);
      } else if (props.path === "/posts/:id/delete" && mode !== "delete") {
        setMode("delete");
        getPost(props.id);
      }
    };
    init();
  }, [props.path, mode, props.id]);

  const create = async (post) => {
    setIsLoading(true);
    const URL = `${BASE_URL}/posts/create`;
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.user.token}`,
      },
      body: JSON.stringify(post),
    });
    const data = await response.json();
    setIsLoading(false);
    navigate(`/${data.post._id}`);
  };

  const update = async (post) => {
    console.log(post);
    try {
      setIsLoading(true);
      const URL = `${BASE_URL}/posts/${props.id}/update`;
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.user.token}`,
        },
        body: JSON.stringify(post),
      });
      await response.json();
      setIsLoading(false);
      await navigate(`/${props.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const destroy = async () => {
    setIsLoading(true);
    const URL = `${BASE_URL}/posts/${props.id}/delete`;
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

  const handleEditorChange = (content) => {
    setContent(content);
  };

  const handleChange = (e) => {
    const v = e.target.value;
    e.target.name === "title"
      ? setTitle(v)
      : e.target.name === "blurb"
      ? setBlurb(v)
      : e.target.name === "blurbImage"
      ? setBlurbImage(v)
      : setBlurbImageAlt(v);
  };

  const handleSubmit = () => {
    const post = { title, blurb, blurbImage, blurbImageAlt, content };
    console.log(post);
    if (mode === "create") {
      create(post);
    } else if (mode === "update") {
      update(post);
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
          <label htmlFor="blurbImage" className="form-label">
            Blurb Image Path
          </label>
          <input
            type="text"
            name="blurbImage"
            className="form-input"
            value={blurbImage}
            onChange={handleChange}
          />
        </div>
        <div className="form-section">
          <label htmlFor="blurbImageAlt" className="form-label">
            Blurb Image Alternate
          </label>
          <input
            type="text"
            name="blurbImageAlt"
            className="form-input"
            value={blurbImageAlt}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <Editor
            apiKey="abh3yg0xpuwi7wp76gc8etjalbd4yg93ib50ubokso0npxiq"
            init={{
              height: 500,
              menubar: true,
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
            onEditorChange={handleEditorChange}
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
