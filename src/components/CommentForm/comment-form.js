import React, { useState } from "react";
import "./comment-form.css";

const CommentForm = (props) => {
  let [author, setAuthor] = useState("");
  let [content, setContent] = useState("");

  const postData = async () => {
    const URL = `https://api-myblog.herokuapp.com/comments/create`;
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, content, postID: props.postID }),
    });
    const data = await response.json();
    sendNewComment(data.comment);
  };

  const sendNewComment = (comment) => {
    props.handleComment(comment);
  };

  const handleChange = (e) => {
    if (e.target.name === "author") {
      setAuthor(e.target.value);
    } else if (e.target.name === "content") {
      setContent(e.target.value);
    }
  };

  //passes new comment up to blog-post
  const handleSubmit = (e) => {
    postData();
    setAuthor("");
    setContent("");
  };

  return (
    <div className="comment-form-container">
      <form className="form">
        <h1 className="form-heading">Leave A Comment</h1>
        <div className="form-section">
          <label className="form-label" htmlFor="author">
            Name
          </label>
          <input
            className="form-input"
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </div>
        <div className="form-section">
          <label className="form-label" htmlFor="content">
            Comment
          </label>
          <textarea
            className="form-textarea form-input"
            name="content"
            value={content}
            onChange={handleChange}
          />
        </div>
        <button type="button" className="form-submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
