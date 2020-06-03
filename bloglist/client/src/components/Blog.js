import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { likeBlog, deleteBlog, addComment } from "../redux";
import { Row, Col, Button, ListGroup, Form } from "react-bootstrap"; 

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newComment, setNewComment] = useState('');


  const blogOnChangeHandler = (e) => {
    e.preventDefault();
    let target = e.target;

    //Update number of likes
    if (target.classList.contains("like-blog")) {
      return dispatch(likeBlog(blog.id, blog.likes + 1));
    }

    //Delete a blog
    if (target.classList.contains("delete-blog")) {
      dispatch(deleteBlog(blog.id));
      return history.push("/");
    }

    if (target.id === "add-comment") {
      dispatch(addComment(blog.id, newComment));
      setNewComment('');
      return
    }
  };



  if (!blog) return <></>;

  return (
    <Row className="px-4" onClick={blogOnChangeHandler}>
      <Col sm={12}>
      <h2 className="text-center display-4">
        {blog.title}
      </h2>
      <p className="blog__content mb-5">{blog.author}</p>
      <p className="blog__likes mb-4">
        <strong>Likes: </strong>
        {blog.likes}{" "}
        <Button className="like-blog ml-4">
          Like
        </Button>
      </p>
      <p className="blog__url">{blog.url}</p>
      <Button className="mb-5">
        Delete
      </Button>

      <h3>Comments</h3>
      <ListGroup variant="flush">
        {blog.comments.map((comment, index) => (
          <ListGroup.Item key={index} action className="comment">
            {comment}<br />
            <strong className="text-dark">Anonymous</strong>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Form.Group controlId="new-comment" className="mt-4">
        <Form.Label><strong>Join the conversation</strong></Form.Label>
        <Form.Control as="textarea" rows="5" value={ newComment } onChange={ e => setNewComment(e.target.value)}></Form.Control>
      </Form.Group>
      <Button id="add-comment">Add comment</Button>
      </Col>
    </Row>
  );
};

export default Blog;
