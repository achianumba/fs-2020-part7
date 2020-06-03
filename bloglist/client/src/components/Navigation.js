import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

export default ({ user, logOut }) => (
  <>
  <Navbar bg="dark" variant="dark" expand="md">
    <Navbar.Brand>
      <h3 className="m-0">Bloglist</h3>
    </Navbar.Brand>
    <Navbar.Toggle />

    <Navbar.Collapse id="site-navbar" className="justify-content-end">
      <Nav>
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/users" className="nav-link">
        Users
      </Link>
      <Button variant="info" onClick={logOut} className="ml-2">
        Log out
      </Button>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  <h5 className="m-0 mt-2 pr-3 text-right">Logged in as <strong className="text-dark">{user && user.name}</strong></h5>
  </>
);
