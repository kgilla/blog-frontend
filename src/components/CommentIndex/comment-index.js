import React, { useState } from "react";
import { BASE_URL } from "../../const";
import Comment from "../Comment";
import CommentForm from "../CommentForm";
import "./comment-index.css";

const Comments = (props) => {
  let [comments, setComments] = useState(props.comments);

  const deleteComment = async (id) => {
    const URL = `${BASE_URL}/comments/${id}/delete`;
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.user.token}`,
      },
    });
    let newComments = comments.filter((c) => c._id !== id);
    setComments(newComments);
  };

  const handleNewComment = (newComment) => {
    if (comments) {
      setComments((comments) => [...comments, newComment]);
    } else {
      setComments([newComment]);
    }
  };

  return (
    <div className="comment-index-container">
      <h1 className="comment-index-heading">
        Comments ({comments ? comments.length : "0"})
      </h1>
      {props.comments.length > 0 ? (
        comments.map((comment) => (
          <Comment
            comment={comment}
            key={comment._id}
            handleDelete={deleteComment}
          />
        ))
      ) : (
        <div>Nothing here</div>
      )}
      <CommentForm postID={props.postID} handleComment={handleNewComment} />
    </div>
  );
};

export default Comments;
