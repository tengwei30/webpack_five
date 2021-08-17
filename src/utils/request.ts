import axios from "axios";
// import qs from "qs";
// import router from "../router";
// import store from "../store";

const request = axios.create({
    // 配置选项
    // baseURL,
    // timeout
});

// 请求拦截器
request.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    function(response) {
        // 状态码为 2XX的都会走这
        return response;
    },
    async function(error) {
        // 状态码 非 2XX的走这
        // console.dir("error --->",error)
        // const { status } = error.response;
        return Promise.reject(error);
    }
);

export default request;
