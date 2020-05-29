import React, { useState, useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux';
import Blogs from "./components/Blogs";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  loginService,
} from "./services/blogs";
import "./App.css";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import Togglable from "./components/Togglable";
import { logoutUser } from "./redux";

const App = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  const [blogs, setBlogs] = useState([]);

  const [message, setMessage] = useState({
    type: "",
    content: "",
  });

  const showMessage = (type, content) => {
    setMessage({
      type: type,
      content: content,
    });

    setTimeout(
      () =>
        setMessage({
          type: "",
          content: "",
        }),
      5000
    );
  };

  const logOut = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  const blogFormRef = React.createRef(); //ref for toggling togglable component  when create-blog button is clicked

  const newBlogHandler = async (blog) => {
    //close togglable component
    blogFormRef.current.toggleVisibility();

    try {
      const savedBlog = await createBlog(blog, user.token);

      setBlogs([...blogs, savedBlog.data]);

      showMessage(
        "success",
        `New blog titled ${savedBlog.data.title} by ${savedBlog.data.author} added successfully`
      );
    } catch (err) {
      showMessage("error", err.response.data.error);
    }
  };

  //update blog likes
  const updateLikes = (blogId) => {
    const likedBlog = blogs.find(({ id }) => id === blogId);

    updateBlog(blogId, { likes: likedBlog.likes + 1 }, user.token)
      .then((updatedLikes) => {
        const updatedBlogView = blogs.filter(({ id }) => id !== blogId);
        const sortedBlogs = [...updatedBlogView, updatedLikes.data].sort(
          (a, b) => a.likes < b.likes
        );

        setBlogs(sortedBlogs);
      })
      .catch((err) => showMessage("error", err.response.data.error));
  };

  //delete a blog
  const deleteBlogHandler = (blogId) => {
    deleteBlog(blogId, user.token)
      .then(() => {
        const updatedBlogView = blogs.filter(({ id }) => id !== blogId);
        setBlogs(updatedBlogView);
      })
      .catch((err) =>
        showMessage(
          "error",
          `Unable to delete blog: ${err.response.data.error}`
        )
      );
  };

  useEffect(() => {
    getAllBlogs().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => a.likes < b.likes);
      setBlogs(sortedBlogs);
    });
  }, []);

  return (
    <>
      {message.content === "" ? (
        " "
      ) : (
        <p className={`message message-${message.type}`}>{message.content}</p>
      )}
      {user !== null ? (
        <div>
          <header id="site-header">
            <h3>{user.name}</h3>
            <button onClick={logOut}>Log out</button>
          </header>

          <Togglable
            showLabel="Create Blog"
            hideLabel="Cancel"
            ref={blogFormRef}
          >
            <div id="form-blog">
              <BlogForm newBlogHandler={newBlogHandler} />
            </div>
          </Togglable>

          <Blogs
            blogs={blogs}
            updateLikes={updateLikes}
            deleteBlog={deleteBlogHandler}
          />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
