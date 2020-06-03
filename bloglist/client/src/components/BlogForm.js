import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../redux";
import { Row, Col, Button, Collapse, Form } from "react-bootstrap";

const BlogForm = () => {
  const dispatch = useDispatch();

  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const [open, setOpen] = useState(false);

  const saveBlog = (e) => {
    e.preventDefault();
    dispatch(createBlog(blog));
  };

  return (
    <>
      <Row className="m-0 mb-5 p-0">
        <Col sm={10}>
          <Button onClick={() => setOpen(true)} className="mb-4">
            Create blog
          </Button>
          <Collapse in={open}>
            <Form onSubmit={saveBlog} id="form-blog">
              <Form.Group controlId="create-blog-title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                value={blog.title}
              />
              </Form.Group>

              <Form.Group controlId="create-blog-author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                onChange={(e) => setBlog({ ...blog, author: e.target.value })}
                value={blog.author}
              />
              </Form.Group>

              <Form.Group controlId="create-blog-url">
              <Form.Label>url</Form.Label>
              <Form.Control
                onChange={(e) => setBlog({ ...blog, url: e.target.value })}
                value={blog.url}
              />
              </Form.Group>
              
              <Button variant="success" type="submit" id="create-blog">
                Create blog
              </Button>
              <Button variant="dark" onClick={() => setOpen(false)} className="ml-4">
                Cancel
              </Button>
            </Form>
          </Collapse>
        </Col>
      </Row>
    </>
  );
};

export default BlogForm;
