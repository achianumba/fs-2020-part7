import React from "react";
import { Link } from "react-router-dom";

const Blogs = ({ blogs }) => {
  return (
    <div id="blogs">
      <h1>Blogs</h1>
      {blogs
        .sort((a, b) => a.likes < b.likes)
        .map((blog) => (
          <p key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </p>
        ))}
    </div>
  );
};

export default Blogs;