import React from "react";
import { useSelector, useDispatch} from 'react-redux';
import Blogs from "./components/Blogs";
import "./App.css";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import { logoutUser } from "./redux";

const App = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const logOut = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  const blogFormRef = React.createRef(); //ref for toggling togglable component  when create-blog button is clicked

  return (
    <>
    <Notification />
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
              <BlogForm />
            </div>
          </Togglable>

          <Blogs />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
