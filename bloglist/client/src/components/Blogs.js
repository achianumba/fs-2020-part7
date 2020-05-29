import React, { useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux';
import Blog from "./Blog";
import { initializeBlogs, likeBlog, deleteBlog } from "../redux";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogOnChangeHandler = (e) => {
    e.preventDefault();

    let target = e.target;
    //display/collapse blog details
    if (target.className === "toggle-blog-collapsed-details") {
      if (target.textContent === "View") {
        target.textContent = "Hide";
      } else {
        target.textContent = "View";
      }

      let collapsedSection = target.parentElement.nextSibling;
      collapsedSection.hidden = !collapsedSection.hidden;
    }

    //Update number of likes
    if (target.className === "like-blog") {
      const blogId = target.dataset.id;
      const numLikes = blogs.find(({ id }) => id === blogId).likes;
      dispatch(likeBlog(blogId, numLikes + 1));
    }

    //Delete a blog
    if (target.className === "delete-blog") {
      dispatch(deleteBlog(target.dataset.id));
    }
  };

  return (
    <div id="blogs" onClick={blogOnChangeHandler}>
      <h1>Blogs</h1>
      {blogs.sort((a, b) => a.likes < b.likes).map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;