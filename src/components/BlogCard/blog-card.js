import React from "react";
import { Link } from "@reach/router";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import "./blog-card.css";

function BlogCard(props) {
  return (
    <div className="blog-card">
      <div className="blog-card-image-box">
        <img
          className="blog-card-image"
          src="https://i.imgur.com/QGReA6i.jpg"
          alt="something"
        ></img>
      </div>

      <div className="blog-card-main">
        <header className="blog-card-header">
          <Link to={`/${props.post._id}`}>
            <h2 className="blog-card-title">{props.post.title}</h2>
          </Link>
          <h4 className="blog-detail-date">
            {moment(props.post.date).format("LL")}
          </h4>
        </header>

        <main className="blog-card-content">
          {ReactHtmlParser(props.post.content)}
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
