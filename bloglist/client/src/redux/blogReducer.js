import blogService from '../services/blogs';

const TOKEN = null; //get state from redux store.

//ACTIONS
const INIT_BLOGS = 'INIT_BLOGS';
const CREATE_BLOG = 'CREATE_BLOG';
const LIKE_BLOG = 'LIKE_BLOG';
const DELETE_BLOG = 'DELETE_BLOG';

//ACTION CREATORS
export const initializeBlogs = () => dispatch => {
    blogService.getAllBlogs()
    .then(blogs => {
        dispatch({
            type: INIT_BLOGS,
            data: blogs.data
        });
    })
    .catch(err => {
        //..dispatch error with notificationReducer ...to be defined
        console.error(err.name, err.message)
    })
}

export const createBlog = blog => dipatch => {
    blogService.createBlog(blog, TOKEN)
    .then(({ data }) => {
        dispatch({
            type: CREATE_BLOG,
            data
        });
        //show notification
    })
    .catch(err => {
        //show notification
        console.error(err.name, error.message);
    })
}

export const likeBlog = id => dispatch => {
    blogService.updateBlog(id, )
};

const deleteBlog = id => ({
    type: DELETE_BLOG,
    id
});
//REDUCER
const blogReducer = (state = [], action) => {
    switch(action.type) {
        case INIT_BLOGS:
            return action.data;
        case CREATE_BLOG:
            return [...state, action.data];
        case LIKE_BLOG:
            const nonLikedBlogs = state.filter(blog => blog.id !== action.data.id);
            return [...nonLikedBlogs, action.data];
        case DELETE_BLOG:
            const updatedBlogView = state.filter(blog => blog.id !== action.data.id);
            return updatedBlogView;
        default:
            return state;
    }
}