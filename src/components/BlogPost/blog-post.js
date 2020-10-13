import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";

import Loader from "../Loader";
import CommentIndex from "../CommentIndex";
import "./blog-post.css";

const BlogPost = (props) => {
  let [post, setPost] = useState("");
  let [author, setAuthor] = useState("");
  let [comments, setComments] = useState("");
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const URL = `https://api-myblog.herokuapp.com/posts/${props.postID}`;
        const response = await fetch(URL);
        const data = await response.json();
        setPost(data.post);
        setAuthor(data.post.author);
        setComments(data.post.comments);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props.postID]);

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="blog-post-container">
          <article className="blog-post">
            <header className="blog-post-header">
              <h1 className="blog-post-title">{post.title}</h1>
              <div className="blog-post-details-box">
                <h2 className="blog-post-author">By {author.fullname}</h2>

                <h4 className="blog-post-date">
                  Posted on {moment(post.date).format("LL")}
                </h4>
              </div>
            </header>
            <nav className="blog-post-nav">
              <Link to={`/posts/${post._id}/update`} post={post}>
                <button className="blog-post-option">Edit Post</button>
              </Link>
              <Link to={`/posts/${post._id}/delete`} post={post}>
                <button className="blog-post-option">Delete Post</button>
              </Link>
            </nav>
            <main className="blog-post-content">
              {ReactHtmlParser(post.content)}
            </main>
            <footer>
              <CommentIndex
                comments={comments}
                postID={post._id}
                user={props.user}
              />
            </footer>
          </article>

          <div className="comment-section"></div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
