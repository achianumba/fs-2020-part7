import { combineReducers } from 'redux';
import { userReducer, usersReducer } from './userReducer';
import { blogReducer } from './blogReducer';
import { notificationReducer } from "./notificationReducer";

export default combineReducers({
    user: userReducer,
    users: usersReducer,
    blogs: blogReducer,
    notification: notificationReducer
});