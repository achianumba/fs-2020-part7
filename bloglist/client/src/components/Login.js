import React, { useState } from "react";
import { loginUser } from "../redux";
import { useDispatch } from "react-redux";
import { Row, Form, Col, Button } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const login = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  return (
    <Row className="login__container m-0 d-flex justify-content-center align-items-center">
      <Col xs={10} sm={8} md={6} lg={4} xl={3}>
        <Form onSubmit={login} id="form-login" className="m-0 border px-4 py-5">
          <h3 className="text-center mb-4">Login</h3>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              minLength="3"
              value={credentials.username}
              type="text"
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              required
              autoFocus={ true }
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              minLength="3"
              value={credentials.password}
              type="password"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" id="login" block>
            Login
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
