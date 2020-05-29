import React from "react";

const Blog = ({ blog }) => (
  <div className="blog">
    <h3 className="blog-title">{blog.title}</h3>
    <p className="blog-author">
      {blog.author}
      <button className="toggle-blog-collapsed-details">View</button>
    </p>
    <div className="blog-collapsed-details" hidden>
      <p className="blog-likes"><strong>Likes: </strong>{blog.likes} <button className="like-blog" data-id={blog.id}>Like</button></p>
      <p className="blog-url">{blog.url}</p>
      <button className="delete-blog" data-id={blog.id}>Delete</button>
    </div>
  </div>
);

export default Blog;
