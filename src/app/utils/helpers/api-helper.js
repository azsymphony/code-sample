import axios from 'axios';
import envConfig from 'envConfig';

/* services */
import LocalStorageService from 'services/local-storage-service';

const initialHeaders = {
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Max-Age': 600,
    'Content-Type': 'application/json'
};

const formHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded'
};

const getHeaders = (isFormRequest) => {
    if (isFormRequest) {
        return Object.assign({}, formHeaders, {
            Authorization: `Bearer ${LocalStorageService.getAccessToken()}`
        });
    }
    return Object.assign({}, initialHeaders, {
        Authorization: `Bearer ${LocalStorageService.getAccessToken()}`
    });
};

export const createQueryString = (params) => {
    const paramsKeys = Object.keys(params);
    let queryString = '';
    paramsKeys.forEach((key, index) => {
        if (Array.isArray(params[key])) {
            if (params[key].length > 0) {
                queryString += index === 0 ? '?' : '&';
                params[key].forEach((el, i) => {
                    if (i > 0) {
                        queryString += '&';
                    }
                    queryString += `${encodeURIComponent(`${key}[${i}]`)}=${encodeURIComponent(el)}`;
                });
            }
        } else {
            queryString += index === 0 ? '?' : '&';
            queryString += `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
        }
    });
    return queryString;
};

const CancelToken = axios.CancelToken;
const previousRequests = {};

class ApiHelper {

    static get(resourceUrl, params = {}, preventLoader = false) {
        const url = `${envConfig.baseUrl}/${resourceUrl + createQueryString(params)}`;
        return axios({
            method: 'get',
            url,
            headers: getHeaders(),
            preventLoader
        });
    }

    static post(resourceUrl, data, cancelPrevious) {
        const url = `${envConfig.baseUrl}/${resourceUrl}`;
        if (cancelPrevious && previousRequests[url]) {
            previousRequests[url].cancel();
        }
        return axios({
            method: 'post',
            cancelToken: new CancelToken((c) => {
                if (!previousRequests[url]) {
                    previousRequests[url] = {};
                }
                previousRequests[url].cancel = c;
            }),
            url,
            data,
            headers: getHeaders()
        });
    }

    static put(resourceUrl, data) {
        const url = `${envConfig.baseUrl}/${resourceUrl}`;
        return axios({
            method: 'put',
            url,
            data,
            headers: getHeaders()
        });
    }

    static remove(resourceUrl, data) {
        const url = `${envConfig.baseUrl}/${resourceUrl}`;
        return axios({
            method: 'delete',
            url,
            data,
            headers: getHeaders()
        });
    }
}

export default ApiHelper;
