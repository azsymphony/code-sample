import axios from 'axios';
import envConfig from 'envConfig';
import ApiHelper from 'utils/helpers/api-helper';

const authConfig = envConfig.auth;
const serverUrl = authConfig.serverUrl;
const clientSecret = authConfig.client_secret;
const clientId = authConfig.client_id;

const GRANT_TYPES = {
    PASSWORD: 'password',
    REFRESH_TOKEN: 'refresh_token'
};

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
};

class AuthService {
    constructor() {
        this.resetPasswordUrl = 'Account/ResetPassword';
        this.setPasswordUrl = 'Account/SetNewPassword';
    }

    transformRequest(data) {
        const str = [];
        Object.keys(data).forEach((key) => {
            str.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
        });
        return str.join('&');
    }

    loginUser(user) {
        const params = {
            grant_type: GRANT_TYPES.PASSWORD,
            client_id: clientId,
            client_secret: clientSecret,
            username: user.email,
            password: user.password
        };
        return axios({
            method: 'POST',
            headers,
            url: serverUrl,
            data: params,
            transformRequest: data => (
                this.transformRequest(data)
            ),
            loginRequest: true
        });
    }

    refreshToken(token) {
        const params = {
            grant_type: GRANT_TYPES.REFRESH_TOKEN,
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: token
        };
        return axios({
            method: 'POST',
            headers,
            url: serverUrl,
            data: params,
            transformRequest: data => (
                this.transformRequest(data)
            ),
            refreshToken: true
        });
    }

    sendUserResetEmail(resetEmail) {
        return ApiHelper.post(this.resetPasswordUrl, { Email: resetEmail })
            .then(response => response, () => null);
    }

    submitPasswordChange(newPasswordData) {
        return ApiHelper.post(this.setPasswordUrl, newPasswordData)
            .then(response => response.data, () => null);
    }
}

export default new AuthService();
