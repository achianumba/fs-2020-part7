import axios from "axios";

const baseUrl = "/api/blogs";
let userDetails = JSON.parse(localStorage.getItem('user'));
let token = userDetails ? userDetails.token : null;

export const getAllBlogs = () => axios.get(baseUrl);

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

export const createComment = (blogId, comment) => {
  return axios.post(`${baseUrl}/${blogId}/comments`, { comment });
}

export default {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  createComment
}