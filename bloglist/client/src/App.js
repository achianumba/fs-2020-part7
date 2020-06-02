import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import "./App.css";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";
import Navigation from "./components/Navigation";
import { logoutUser, initializeUsers, initializeBlogs } from "./redux";

const App = () => {
  const dispatch = useDispatch();
  const { user, users, blogs } = useSelector((state) => ({
    user: state.user,
    users: state.users,
    blogs: state.blogs,
  }));

  const userRoute = useRouteMatch("/users/:id");
  const userRouteId = userRoute ? userRoute.params.id : null;
  const matchedUser = users.find(({ id }) => id === userRouteId);

  const blogRoute = useRouteMatch("/blogs/:id");
  const blogRouteId = blogRoute ? blogRoute.params.id : null;
  const matchedBlog = blogs.find(({ id }) => id === blogRouteId);

  const logOut = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  const blogFormRef = React.createRef(); //ref for toggling togglable component  when create-blog button is clicked

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <>
      <Notification />
      {!user && <Login />}
      {user && (
        <>
          <header id="site-header">
            <Navigation />
            <h3>{user && user.name}</h3>
            <button onClick={logOut}>Log out</button>
          </header>
          <Switch>
            <Route path="/users/:id">
              <User user={matchedUser} />
            </Route>

            <Route path="/users">
              <Users users={users} />
            </Route>

            <Route path="/blogs/:id">
              <Blog blog={matchedBlog} />
            </Route>

            <Route path="/">
              <div>
                <Togglable
                  showLabel="Create Blog"
                  hideLabel="Cancel"
                  ref={blogFormRef}
                >
                  <div id="form-blog">
                    <BlogForm />
                  </div>
                </Togglable>

                <Blogs blogs={blogs} />
              </div>
            </Route>
          </Switch>
        </>
      )}
    </>
  );
};

export default App;
