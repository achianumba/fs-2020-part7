import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, CardDeck, Card, Button } from "react-bootstrap";

const Blogs = ({ blogs }) => {
  return (
    <>
      <Row>
        <Col>
          <h1 className="text-center mb-4">Latest Blogs</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <CardDeck className="d-flex flex-wrap justify-content-around">
            {blogs
              .sort((a, b) => a.likes < b.likes)
              .map((blog) => (
                <Col sm={11} md={5} lg={4} xl={3} key={blog.id}>
                  <Card key={blog.id} className="mb-3">
                    <Card.Img variant="top" src="https://source.unsplash.com/random/572x360" />
                    <Card.Body>
                      <Card.Title>{blog.title}</Card.Title>
                      <Card.Text>By {blog.author}</Card.Text>
                      <Link to={`/blogs/${blog.id}`} className="btn btn-primary">Read more</Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </CardDeck>
        </Col>
      </Row>
    </>
  );
};

export default Blogs;
