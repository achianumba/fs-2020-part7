import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import Blogs from "./components/Blogs";
import "./App.css";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";
import { logoutUser, initializeUsers } from "./redux";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const userRoute = useRouteMatch("/users/:id");
  const userRouteId = userRoute ? userRoute.params.id : null;
  const matchedUser = users.find(({ id }) => id === userRouteId);

  const logOut = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  const blogFormRef = React.createRef(); //ref for toggling togglable component  when create-blog button is clicked

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <>
      <Notification />
      {user && (
        <header id="site-header">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
          </nav>
          <h3>{user && user.name}</h3>
          <button onClick={logOut}>Log out</button>
        </header>
      )}
      <Switch>
        <Route path="/users/:id">
          <User user={matchedUser} />
        </Route>

        <Route path="/users">
          <Users users={users} />
        </Route>

        <Route path="/">
          {user !== null ? (
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

              <Blogs />
            </div>
          ) : (
            <Login />
          )}
        </Route>
      </Switch>
    </>
  );
};

export default App;
