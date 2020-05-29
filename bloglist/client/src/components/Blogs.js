import React from "react";
import Blog from "./Blog";

const Blogs = ({ blogs, updateLikes, deleteBlog }) => {
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
      updateLikes(target.dataset.id);
    }

    //Delete a blog
    if (target.className === "delete-blog") {
      deleteBlog(target.dataset.id);
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
