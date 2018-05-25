import { hashHistory } from 'react-router';
import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
/* utils */
import { translate } from 'utils/i18n/i18n-model';
/* actions */
import { ActionTypes } from './auth-actions';
/* services */
import AuthService from 'services/auth-service';
import LocalStorageService from 'services/local-storage-service';

function* tryUserLogin(action) {
    yield put({ type: ActionTypes.AUTH_SET_ERROR, error: '' });
    let response;
    try {
        response = yield AuthService.loginUser(action.user);
    } catch (error) {
        if (error.response.data.error === 'invalid_grant') {
            yield put({ type: ActionTypes.AUTH_SET_ERROR, error: translate('AUTH.LOGIN.CREDENTIALS_ERROR') });
        } else {
            toast(error.response.data.error_description);
        }
    }
    if (response) {
        yield put({ type: ActionTypes.AUTH_RESET_REDUCERS });
        const { data } = response;
        LocalStorageService.setTokens(data.access_token, data.refresh_token);
        hashHistory.push('map');
    }
}

function logoutUser() {
    LocalStorageService.clearTokens();
    const currentLocation = hashHistory.getCurrentLocation();
    if (currentLocation.pathname !== '/login') {
        hashHistory.push('login');
    }
}

function* sendUserResetEmail(action) {
    const response = yield AuthService.sendUserResetEmail(action.resetEmail);
    if (response && response.status === 200) {
        yield put({ type: ActionTypes.AUTH_SET_ACTIVE_FORM, activeForm: 'forgot-password-success' });
    }
}

function* submitPasswordChange(action) {
    const response = yield AuthService.submitPasswordChange(action.newPasswordData);
    if (response && response.ResponseMessage) {
        toast(response.ResponseMessage, { type: toast.TYPE.SUCCESS });
        hashHistory.push('login');
    }
}

export default function* authSaga() {
    yield takeEvery(ActionTypes.AUTH_TRY_LOGIN, tryUserLogin);
    yield takeEvery(ActionTypes.AUTH_LOGOUT_USER, logoutUser);
    yield takeEvery(ActionTypes.AUTH_SEND_USER_RESET_EMAIL, sendUserResetEmail);
    yield takeEvery(ActionTypes.AUTH_SUBMIT_PASSWORD_CHANGE, submitPasswordChange);
}
