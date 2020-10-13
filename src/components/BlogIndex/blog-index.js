import React, { useState, useEffect } from "react";
import BlogCard from "../BlogCard";
import Loader from "../Loader";

const BlogIndex = () => {
  let [posts, setPosts] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const URL = "https://api-myblog.herokuapp.com/posts/";
        const response = await fetch(URL);
        const data = await response.json();
        setPosts(data.posts);
        setIsLoading(false);
      } catch(err) {
        console.log(err)
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="blog-index-container">
          <h2 className="sub-heading">All Blog Posts</h2>
          <div className="blog-index">
            {posts.map((post) => (
              <BlogCard
                post={post}
                author={post.author}
                comments={post.comments}
                key={post._id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogIndex;
