import loginService from '../services/login';
import { success, failure, hideLater } from "./notificationReducer";

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const loginUser = user => dispatch => {
    loginService(user)
    .then(({ data }) => {
        dispatch({
            type: LOGIN,
            data
        });

        dispatch(success(`Welcome, ${ data.name }!`))
    })
    .catch(err => {
        dispatch(failure(err.response.data.error));
    })
}

export const logoutUser = () => ({
    type: LOGOUT
});

export const userReducer = (
    state = JSON.parse(localStorage.getItem('user')),
    action
    ) => {
    switch(action.type) {
        case LOGIN:
            localStorage.setItem('user', JSON.stringify(action.data));
            return action.data
        case LOGOUT:
            localStorage.removeItem('user');
            return localStorage.getItem('user'); 
        default: return state;
    }
}