const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const HIDE = 'HIDE';
const START_TIMER = 'START_TIMER';

const clearTimer = (timer) => {
    if (timer) clearTimeout(timer);
};

export const success = (content) => ({
    type: SUCCESS,
    content
});

export const failure = content => ({
    type: FAILURE,
    content
});

const hide = () => ({
    type: HIDE
});

// const startTimer = id => ({
//     type: START_TIMER,
//     id
// });

export const hideLater = () => (dispatch) => {
    setTimeout(() => {
        dispatch(hide())
    }, 10000);
};

export const notificationReducer = (state = { type: '', content: '', timeout: null }, action) => {
    switch(action.type) {
        case START_TIMER:
            return { ...state, timeout: action.timeout }
        case SUCCESS:
            clearTimer(state.timeout);
            return { ...state, type: 'success', content: action.content };
        case FAILURE:
            clearTimer(state.timeout);
            return { ...state, type: 'danger', content: action.content };
        case HIDE:
            clearTimer(state.timeout);
            return { type: '', content: '', timeout: null }
        default: return state
    }
}