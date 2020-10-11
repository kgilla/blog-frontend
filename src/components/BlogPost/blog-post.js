import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import moment from "moment";
import Loader from "../Loader";
import CommentIndex from "../CommentIndex";
import "./blog-post.css";

const BlogPost = (props) => {
  let [post, setPost] = useState({});
  let [author, setAuthor] = useState({});
  let [comments, setComments] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const URL = `https://api-myblog.herokuapp.com/posts/${props.postId}`;
      const response = await fetch(URL);
      const data = await response.json();
      setPost(data.post);
      setAuthor(data.author);
      setComments(data.post.comments);
      setIsLoading(false);
    };
    fetchData();
  }, [props.postId]);

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="blog-post-container">
          <nav className="blog-post-nav">
            <Link to={`/${post._id}/update`} post={post}>
              <button className="nav-link">Edit Post</button>
            </Link>
            <Link to={`/${post._id}/delete`} post={post}>
              <button className="nav-link">Delete Post</button>
            </Link>
          </nav>
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
            <main className="blog-post-content-container">
              <p className="blog-post-content">{post.content}</p>
            </main>
            <footer></footer>
          </article>
          <div className="comment-section">
            <CommentIndex
              comments={comments}
              postID={post._id}
              user={props.user}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
