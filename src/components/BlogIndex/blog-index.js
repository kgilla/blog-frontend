import React, { useState, useEffect } from "react";
import BlogCard from "../BlogCard";
import Loader from "../Loader";

const BlogIndex = () => {
  let [data, setData] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const URL = "https://api-myblog.herokuapp.com/posts/";
      const response = await fetch(URL);
      const data = await response.json();
      setData(data.posts);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <h1>All Blog Posts</h1>

          <div className="blog-index">
            {data.map((post) => (
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
