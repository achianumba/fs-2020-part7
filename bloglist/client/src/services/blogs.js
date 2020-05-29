import axios from "axios";
const baseUrl = "/api/blogs";

export const getAllBlogs = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const loginService = async (credentials) =>
  await axios.post("/api/login", credentials);

export const createBlog = async (blog, token) => {
  return await axios.post(baseUrl, blog, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateBlog = async (blogId, update, token) => {
  return await axios.put(`${baseUrl}/${blogId}`, update, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteBlog = async (blogId, token) => {
  return await axios.delete(`${baseUrl}/${blogId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog
}