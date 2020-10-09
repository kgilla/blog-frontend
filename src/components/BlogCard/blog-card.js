import React from "react";
import { Link } from "@reach/router";
import moment from "moment";
import "./blog-card.css";

function BlogCard(props) {
  return (
    <div className="blog-card">
      <div className="blog-card-image-box"></div>

      <div className="blog-card-main">
        <header className="blog-card-header">
          <div className="blog-card-header-info">
            <h4 className="blog-detail-date">
              {moment(props.post.date).format("LL")}
            </h4>
            <h4 className="blog-detail-comment-count">
              {props.comments ? props.comments.length : "0"} Comments
            </h4>
          </div>
          <Link to={`/${props.post._id}`}>
            <h2 className="blog-card-title">{props.post.title}</h2>
          </Link>
        </header>

        <main>
          <p className="blog-card-content">{props.post.content}</p>
        </main>
        <Link to={`/${props.post._id}`}>
          <footer className="blog-card-footer">
            <h4>READ MORE</h4>
          </footer>
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
