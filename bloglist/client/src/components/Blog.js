import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { likeBlog, deleteBlog, addComment } from "../redux";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newComment, setNewComment] = useState('');

  const blogOnChangeHandler = (e) => {
    e.preventDefault();
    let target = e.target;

    //Update number of likes
    if (target.className === "like-blog") {
      return dispatch(likeBlog(blog.id, blog.likes + 1));
    }

    //Delete a blog
    if (target.className === "delete-blog") {
      dispatch(deleteBlog(blog.id));
      return history.push("/");
    }

    if (target.id === "add-comment") {
      dispatch(addComment(blog.id, newComment));
      return
    }
  };



  if (!blog) return <></>;

  return (
    <div className="blog" onClick={blogOnChangeHandler}>
      <h3 className="blog-title" data-id={blog.id}>
        {blog.title}
      </h3>
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

      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>

      <textarea id="new-comment" value={ newComment } onChange={ e => setNewComment(e.target.value)}></textarea>
      <button id="add-comment">Add comment</button>
    </div>
  );
};

export default Blog;
