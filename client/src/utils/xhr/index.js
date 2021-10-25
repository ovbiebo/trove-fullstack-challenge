import axios from 'axios'
import {getAccessToken, getRefreshToken, setTokens} from "../../data-sources/local_storage";

function returnAxiosInstance() {
    const instance = axios.create({baseURL: process.env.REACT_APP_API_URL})
    instance.interceptors.request.use(function (config) {
        const token = getAccessToken();
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });

    let rt = true
    instance.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        const originalRequest = error.config;

        if(!rt) return Promise.reject(error);
        rt = false;

        if (error.response.status === 403 && originalRequest.url === `${process.env.REACT_APP_API_URL}/auth/token`) {
            return Promise.reject(error);
        }

        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = getRefreshToken();
            return instance
                .post('/auth/token', {"refreshToken": refreshToken})
                .then(res => {
                    if (res.status === 201) {
                        setTokens(res.data);
                        instance.defaults.headers.Authorization = 'Bearer ' + getAccessToken();
                        return instance(originalRequest);
                    }
                })
        }

        return Promise.reject(error);
    });
    return instance;
}

export const get = (url) => {
    const axios = returnAxiosInstance()
    return axios.get(url)
}

export const post = (url, body) => {
    const axios = returnAxiosInstance()
    return axios.post(url, body)
}

export const put = (url, body) => {
    const axios = returnAxiosInstance()
    return axios.put(url, body)
}

export const patch = (url, body) => {
    const axios = returnAxiosInstance()
    return axios.patch(url, body)
}

export const del = (url) => {
    const axios = returnAxiosInstance()
    return axios.delete(url)
}
