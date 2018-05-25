export const ActionTypes = {
    AUTH_TRY_LOGIN: 'AUTH_TRY_LOGIN',
    AUTH_LOGOUT_USER: 'AUTH_LOGOUT_USER',
    AUTH_SET_ERROR: 'AUTH_SET_ERROR',
    AUTH_SEND_USER_RESET_EMAIL: 'AUTH_SEND_USER_RESET_EMAIL',
    AUTH_RESET_REDUCERS: 'AUTH_RESET_REDUCERS',
    AUTH_SET_VALUE: 'AUTH_SET_VALUE',
    AUTH_PASSWORD_CHANGE_ERROR: 'AUTH_PASSWORD_CHANGE_ERROR',
    AUTH_SUBMIT_PASSWORD_CHANGE: 'AUTH_SUBMIT_PASSWORD_CHANGE',
    AUTH_SET_ACTIVE_FORM: 'AUTH_SET_ACTIVE_FORM'
};

export function tryLoginAction(dispatch, user) {
    dispatch({
        type: ActionTypes.AUTH_TRY_LOGIN,
        user
    });
}

export function logoutUser(dispatch) {
    dispatch({
        type: ActionTypes.AUTH_LOGOUT_USER
    });
}

export function sendUserResetEmail(dispatch, resetEmail) {
    dispatch({
        type: ActionTypes.AUTH_SEND_USER_RESET_EMAIL,
        resetEmail
    });
}

export function setValue(dispatch, field, value) {
    dispatch({
        type: ActionTypes.AUTH_SET_VALUE,
        field,
        value
    });
}

export function submitPasswordChange(dispatch, newPasswordData) {
    dispatch({
        type: ActionTypes.AUTH_SUBMIT_PASSWORD_CHANGE,
        newPasswordData
    });
}

export function setActiveForm(dispatch, activeForm) {
    dispatch({
        type: ActionTypes.AUTH_SET_ACTIVE_FORM,
        activeForm
    });
}
