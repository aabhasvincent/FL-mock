const initialState = {
    message: 'This is Server',
};


export const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_MESSAGE':
            return {
                ...state,
                message: action.message,
            };
        default:
            return state;
    }
};

export const setMessage = messageText => ({ type: 'SET_MESSAGE', message: messageText });