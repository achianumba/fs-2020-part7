import axios from "axios";
const baseUrl = "/api/blogs";
const { token } = JSON.parse(localStorage.getItem('user'));

export const getAllBlogs = () => axios.get(baseUrl);

export const loginService = async (credentials) =>
  await axios.post("/api/login", credentials);

export const createBlog = async (blog) => {
  return await axios.post(baseUrl, blog, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateBlog = async (blogId, update) => {
  return await axios.put(`${baseUrl}/${blogId}`, update, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteBlog = async (blogId) => {
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