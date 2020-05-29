import React from "react";

const Login = ({ login, credentials, setCredentials }) => (
  <div id="login-container">
    <form onSubmit={login} id="form-login">
      <label htmlFor="username">Username</label>
      <input
        minLength="3"
        value={credentials.username}
        id="username"
        type="text"
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        required
      />

      <label htmlFor="password">Password</label>
      <input
        minLength="3"
        value={credentials.password}
        id="password"
        type="password"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        required
      />

      <button type="submit" id="login">
        Login
      </button>
    </form>
  </div>
);

export default Login;
