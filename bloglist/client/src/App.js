import React, { useState, useEffect } from "react";
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

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

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

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const login = await loginService(credentials);
      setCredentials({ username: "", password: "" });
      localStorage.setItem("user", JSON.stringify(login.data));
      setUser(login.data);
      showMessage("success", "Logged in successfully");
    } catch (err) {
      showMessage("error", err.response.data.error);
    }
  };

  const logOut = (e) => {
    e.preventDefault();
    setUser(null);
    localStorage.clear();
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
    const userDetails = JSON.parse(localStorage.getItem("user"));

    if (userDetails) {
      setUser(userDetails);
    }

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
        <Login
          login={loginHandler}
          credentials={credentials}
          setCredentials={setCredentials}
        />
      )}
    </>
  );
};

export default App;
