import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const BlogForm = (props) => {
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");

  const create = async (title, content) => {
    const URL = "https://api-myblog.herokuapp.com/posts/create";
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({ title, content }),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleEditorChange = (e) => {
    setContent(e.target.getContent());
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    create(title, content);
  };

  return (
    <div className="form-container">
      <form id="blog-form">
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
          <Editor
            apiKey="abh3yg0xpuwi7wp76gc8etjalbd4yg93ib50ubokso0npxiq"
            initialValue="<p>Initial content</p>"
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
          />
        </div>
        <button type="button" className="form-submit" onClick={handleSubmit}>
          Create Post
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
