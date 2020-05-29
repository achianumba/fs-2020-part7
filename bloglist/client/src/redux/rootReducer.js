import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { blogReducer } from './blogReducer';
import { notificationReducer } from "./notificationReducer";

export default combineReducers({
    user: userReducer,
    blogs: blogReducer,
    notification: notificationReducer
});