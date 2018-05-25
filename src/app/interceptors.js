import axios from 'axios';
import { toast } from 'react-toastify';
/* utils */
import { translate } from 'utils/i18n/i18n-model';
/* services */
import AuthService from 'services/auth-service';
import LocalStorageService from 'services/local-storage-service';

import store from './app';

let requestsInProgress = 0;
let RefreshPromise = null;
let showTokenNotification = false;
let expiredSessionToastId = null;

axios.interceptors.request.use((request) => {
    if (!request.preventLoader) {
        requestsInProgress++;
        store.dispatch({ type: 'TOGGLE_LOADER', payload: true });
    }
    return request;
});

axios.interceptors.response.use((response) => {
    if (response.config.loginRequest && expiredSessionToastId) {
        toast.dismiss(expiredSessionToastId);
    }
    if (!response.config.preventLoader) {
        requestsInProgress--;
    }
    if (requestsInProgress <= 0) {
        store.dispatch({ type: 'TOGGLE_LOADER', payload: false });
    }
    return response;
}, (error) => {
    const originalRequest = error.config;
    if (!error.config.preventLoader) {
        requestsInProgress--;
    }
    if (requestsInProgress <= 0) {
        store.dispatch({ type: 'TOGGLE_LOADER', payload: false });
    }

    function rejectRequest(errorObj) {
        LocalStorageService.clearTokens();
        store.dispatch({ type: 'AUTH_LOGOUT_USER' });
        return Promise.reject(errorObj);
    }

    // trying to login with wrong credentials
    if (error.response && error.response.data.error === 'invalid_grant') {
        return Promise.reject(error);
    }

    // refresh token wrong or expired
    if (originalRequest.refreshToken) {
        return rejectRequest(error);
    }

    if (error.response && error.response.status === 401 && !originalRequest.retryRequest) {
        originalRequest.retryRequest = true;
        if (!RefreshPromise) {
            const refreshToken = LocalStorageService.getRefreshToken();
            if (refreshToken) {
                RefreshPromise = AuthService.refreshToken(refreshToken);
                showTokenNotification = true;
            } else {
                return rejectRequest(error);
            }
        }
        return RefreshPromise.then((response) => {
            RefreshPromise = null;
            const { data } = response;
            LocalStorageService.setTokens(data.access_token, data.refresh_token);
            originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
            return axios(originalRequest);
        }, () => {
            RefreshPromise = null;
            if (showTokenNotification) {
                expiredSessionToastId = toast(translate('ERROR.TOKEN_EXPIRED'), {
                    type: toast.TYPE.WARNING,
                    autoClose: false
                });
                showTokenNotification = false;
            }
            return rejectRequest(error);
        });
    }

    /* handling generic 400 errors */
    if (error.response && error.response.status === 400 && error.response.data) {
        Object.keys(error.response.data).forEach((key) => {
            let message;
            if (Array.isArray(error.response.data[key])) {
                message = error.response.data[key].join('; ');
            } else if (typeof error.response.data[key] === 'string') {
                message = error.response.data[key];
            } else {
                message = translate('ERROR.SOME_ERROR_OCCURRED');
            }
            toast(message, { type: toast.TYPE.WARNING });
        });
    }

    /* handling unauthorized errors */
    if (error.response && error.response.status === 401) {
        toast(translate('ERROR.UNAUTHORIZED'), { type: toast.TYPE.ERROR });
    }

    /* handling forbidden errors */
    // if (error.response && error.response.status === 403) {
    //     toast(translate('ERROR.FORBIDDEN'), { type: toast.TYPE.WARNING });
    // }

    /* handling 404 errors */
    if (error.response && error.response.status === 404) {
        toast(translate('ERROR.NOT_FOUND'), { type: toast.TYPE.ERROR });
    }

    /* handling >500 errors */
    if (error.response && error.response.status >= 500 && error.response.status < 600) {
        toast(translate('ERROR.SERVER'), { type: toast.TYPE.ERROR });
    }

    /* handling other errors */
    if ((!error.response || !error.response.status) && error.message) {
        toast(error.message, { type: toast.TYPE.ERROR });
    }

    return Promise.reject(error);
});
