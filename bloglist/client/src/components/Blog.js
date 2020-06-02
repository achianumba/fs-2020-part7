import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { likeBlog, deleteBlog } from "../redux";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  if (!blog) return <></>;

  const blogOnChangeHandler = (e) => {
    e.preventDefault();
    let target = e.target;

    //Update number of likes
    if (target.className === "like-blog") {
      dispatch(likeBlog(blog.id, blog.likes + 1));
    }

    //Delete a blog
    if (target.className === "delete-blog") {
      dispatch(deleteBlog(blog.id));
      history.push("/");
    }
  };

  return (
    <div className="blog" onClick={ blogOnChangeHandler }>
      <h3 className="blog-title">{blog.title}</h3>
      <p className="blog-author">{blog.author}</p>
      <p className="blog-likes">
        <strong>Likes: </strong>
        {blog.likes}{" "}
        <button className="like-blog" data-id={blog.id}>
          Like
        </button>
      </p>
      <p className="blog-url">{blog.url}</p>
      <button className="delete-blog" data-id={blog.id}>
        Delete
      </button>
    </div>
  );
};

export default Blog;