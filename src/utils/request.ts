/**
 * 封装 axios 请求， 请求只能在 services/ 调用
 *
 * */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs, { ParsedQuery } from 'query-string';


const API_BASE_URL = process.env.NODE_ENV === 'development' ? '' : '';
const TIMEOUT = 5000;

export interface AxiosConfig extends AxiosRequestConfig {
    timeout?: number;
    header?: { [key: string]: string };
}

const rAxios = axios.create();
rAxios.defaults.timeout = TIMEOUT;
rAxios.defaults.baseURL = API_BASE_URL;

export const handleResponse = (response: AxiosResponse) => {
    if (response?.status !== 200) {
        throw new Error('网路请求错误');
    }
    if (response?.data?.code === 200) {
        return response?.data?.datas;
    }
    throw new Error('网路请求错误');
};

export interface AxiosRequestCustomConfig {
    headers?: object;
    noStringify?: boolean;
}

export function transformData(data: any, config?: AxiosRequestConfig & AxiosRequestCustomConfig) {
    if (config?.headers?.['Content-Type'] === 'application/json') {
        return JSON.stringify(data);
    }
    return config && config.noStringify ? data : qs.stringify(data);
}

export const handleErrorResponse = (response: AxiosResponse) => {
    console.log(response);
};

export const get = (
    url: string,
    query: ParsedQuery,
    options?: AxiosConfig | AxiosRequestConfig
) => {
    const { timeout = TIMEOUT } = options || {};
    const realUrl = qs.stringifyUrl({ url, query });

    return new Promise((resolve, reject) => {
        axios
            .get(realUrl, {
                timeout
            })
            .then((resp: AxiosResponse) => {
                const data = handleResponse(resp);
                resolve(data);
            })
            .catch(() => {
                const errorMsg = new Error('网络错误，请稍后重试');
                reject(errorMsg);
            });
    });
};

export const post = (url: string, data: object, options?: AxiosConfig) => {
    const { timeout = TIMEOUT, headers } = options || {};
    const realData = transformData(data, options);

    return new Promise((resolve, reject) => {
        axios
            .post(url, realData, {
                timeout,
                headers: {
                    ...headers
                }
            })
            .then((resp: AxiosResponse) => {
                const data = handleResponse(resp);
                resolve(data);
            })
            .catch(() => {
                const errorMsg = new Error('网络错误，请稍后重试');
                reject(errorMsg);
            });
    });
};
