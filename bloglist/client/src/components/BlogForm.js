import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../redux";

const BlogForm = () => {
  const dispatch = useDispatch();

  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const saveBlog = (e) => {
    e.preventDefault();
    dispatch(createBlog(blog));
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

export default BlogForm;