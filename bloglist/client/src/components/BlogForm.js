import React, { useState } from "react";
import PropTypes from 'prop-types';

const BlogForm = ({ newBlogHandler }) => {
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  //passes new blog to newBlogHandler
  const saveBlog = (e) => {
    e.preventDefault();
    newBlogHandler(blog);
  };

  return (
    <form onSubmit={saveBlog} id="form-blog">
      <label htmlFor="create-blog-title">Title</label>
      <input
        id="create-blog-title"
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        value={blog.title}
      />
      <label htmlFor="create-blog-author">Author</label>
      <input
        id="create-blog-author"
        onChange={(e) => setBlog({ ...blog, author: e.target.value })}
        value={blog.author}
      />
      <label htmlFor="create-blog-url">url</label>
      <input
        id="create-blog-url"
        onChange={(e) => setBlog({ ...blog, url: e.target.value })}
        value={blog.url}
      />
      <button type="submit" id="create-blog">
        Create blog
      </button>
    </form>
  );
};

BlogForm.propTypes = {
  newBlogHandler: PropTypes.func.isRequired
}

export default BlogForm;