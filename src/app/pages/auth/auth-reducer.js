import { ActionTypes } from './auth-actions';

const initialState = {
    activeForm: 'login',
    error: '',
    email: '',
    password: '',
    resetEmail: '',
    confirmPassword: '',
    passwordChangeError: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.AUTH_SET_ERROR:
        return Object.assign({}, state, {
            error: action.error
        });
    case ActionTypes.AUTH_SET_VALUE:
        if (action.field) {
            const fieldObj = {};
            fieldObj[action.field] = action.value;
            return Object.assign({}, state, fieldObj);
        }
        return Object.assign({}, initialState);
    case ActionTypes.AUTH_PASSWORD_CHANGE_ERROR: {
        return Object.assign({}, state, {
            passwordChangeError: action.error
        });
    }
    case ActionTypes.AUTH_SEND_USER_RESET_EMAIL: {
        return Object.assign({}, state, {
            resetEmail: action.resetEmail
        });
    }
    case ActionTypes.AUTH_SET_ACTIVE_FORM: {
        return Object.assign({}, state, {
            activeForm: action.activeForm
        });
    }
    default:
        return state;
    }
}
