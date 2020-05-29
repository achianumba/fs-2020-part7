import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

const blog = {
  title: "A Day in the Life of an Amateur Tester",
  author: "The Tester",
  url: "http:localhost:3000"
};

test("By default, Blog title and author are visible but url and likes are hidden", () => {
  const blogComponent = render(<Blog blog={blog} />).container;
  const title = blogComponent.querySelector(".blog-title");
  const author = blogComponent.querySelector(".blog-author");
  const collapsed = blogComponent.querySelector(".blog-collapsed-details");

  expect(title).toBeVisible();
  expect(author).toBeVisible();
  expect(collapsed).not.toBeVisible();
});

test("BlogForm's onSubmit handler is called with the proper parameters", () => {
  const mockHandler = jest.fn();

  const component = render(<BlogForm newBlogHandler={mockHandler} />).container;

  const form = component.querySelector("form");
  const title = component.querySelector("#create-blog-title");
  const author = component.querySelector("#create-blog-author");
  const url = component.querySelector("#create-blog-url");

  //populate form fields
  fireEvent.change(title, {
    target: { value: blog.title },
  });

  fireEvent.change(author, {
    target: { value: blog.author },
  });

  fireEvent.change(url, {
    target: { value: blog.url },
  });

  //submit form
  fireEvent.submit(form);

  //tests
  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0]).toEqual(blog);
});