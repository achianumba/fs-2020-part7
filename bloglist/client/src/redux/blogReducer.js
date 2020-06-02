import blogService from "../services/blogs";
import { success, failure, hideLater } from "./notificationReducer";

//ACTIONS
const INIT_BLOGS = "INIT_BLOGS";
const CREATE_BLOG = "CREATE_BLOG";
const LIKE_BLOG = "LIKE_BLOG";
const DELETE_BLOG = "DELETE_BLOG";
const ADD_COMMENT = "ADD_COMMENT";

//ACTION CREATORS
export const initializeBlogs = () => (dispatch) => {
  blogService
    .getAllBlogs()
    .then(({ data }) => {
      dispatch({
        type: INIT_BLOGS,
        data,
      });
    })
    .catch((err) => {
      console.error(err.name, err.message);
    });
};

export const createBlog = (blog) => (dispatch) => {
  blogService
    .createBlog(blog)
    .then(({ data }) => {
      dispatch({
        type: CREATE_BLOG,
        data,
      });

      const msg = `New blog titled "${data.title} by ${data.author} added successfully`;

      dispatch(success(msg));
      dispatch(hideLater());
    })
    .catch((err) => {
      dispatch(failure(err.response.data.error));
      dispatch(hideLater());
      console.error(err.name, err.message);
    });
};

export const likeBlog = (id, numLikes) => (dispatch) => {
  blogService
    .updateBlog(id, { likes: numLikes })
    .then(({ data }) => {
      dispatch({
        type: LIKE_BLOG,
        data,
      });

      dispatch(success(`You liked "${data.title}`));
      dispatch(hideLater());
    })
    .catch((err) => {
      dispatch(failure(err.response.data.error));
      dispatch(hideLater());
      console.error(err.name, err.message);
    });
};

export const deleteBlog = (id) => (dispatch) => {
  blogService
    .deleteBlog(id)
    .then(() => {
      dispatch({
        type: DELETE_BLOG,
        id,
      });
      dispatch(success(`Deleted successfully`));
      dispatch(hideLater());
    })
    .catch((err) => {
      dispatch(failure(err.response.data.error));
      dispatch(hideLater());
      console.error(err.name, err.message);
    });
};

export const addComment = (id, comment) => dispatch => {
  blogService.createComment(id, comment)
    .then(({ data }) => {
      dispatch({
        type: ADD_COMMENT,
        data
      });
      dispatch(success(`Comment added successfully`));
      dispatch(hideLater());
    })
    .catch((err) => {
      dispatch(failure(err.response.data.error));
      dispatch(hideLater());
      console.error(err.name, err.message);
    });
}
//REDUCER
export const blogReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_BLOGS:
      return action.data;
    case CREATE_BLOG:
      return [...state, action.data];
    case LIKE_BLOG:
      const nonLikedBlogs = state.filter((blog) => blog.id !== action.data.id);
      return [...nonLikedBlogs, action.data];
    case DELETE_BLOG:
      const updatedBlogView = state.filter((blog) => blog.id !== action.id);
      return updatedBlogView;
    case ADD_COMMENT:
      const withoutCommented = state.filter((blog) => blog.id !== action.data.id);
      return [ ...withoutCommented, action.data];
    default:
      return state;
  }
};