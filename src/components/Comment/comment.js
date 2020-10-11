import React from "react";
import moment from "moment";

import "./comment.css";

const Comment = (props) => {
  const handleClick = () => {
    props.handleDelete(props.comment._id);
  };

  return (
    <div className="comment-container">
      <header className="comment-header">
        <h3 className="comment-author">{props.comment.author}</h3>
        <h4 className="comment-date">
          Posted on {moment(props.comment.date).format("LL")}
        </h4>
      </header>

      <p className="comment-content">{props.comment.content}</p>
      <footer>
        <button onClick={handleClick}>Delete Comment</button>
      </footer>
    </div>
  );
};

export default Comment;
