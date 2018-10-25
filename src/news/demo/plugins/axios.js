/* global SANGO2_API_HOST */
import axios from "axios";

// 添加一个请求拦截器
const requestFilter = instance => {
    instance.interceptors.request.use(
        config => {
            // console.log(config)
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );
};

// 添加一个响应拦截器
const responseFilter = instance => {
    instance.interceptors.response.use(
        response => {
            if (response.data.code == 40101) {
                // 处理用户登录功能
                location.href = "https://m.9888.cn/mpwap/orderuser/toLogin.shtml";
            }
            return {
                data: response.data,
                headers: response.headers,
                request: response.request,
                status: response.status,
                status: response.status
            };
        },
        error => {
            if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    );
};

let options = {
    baseURL: __DEBUG__ ? "/api/test-c/wap/" : __API__
};

let ajax = {
    options,
    init() {
        // 实例化
        let instance = axios.create(options);
        // 默认配置
        instance.defaults.withCredentails = true;
        requestFilter(instance);
        responseFilter(instance);
        return instance;
    },
    post(url, data = {}, config = {}) {
        return this.init().post(url, data);
    },
    put(url, data = {}, config = {}) {
        return this.init().put(url, data);
    },
    delete(url, config = {}) {
        return this.init().delete(url, config);
    },
    get(url, config = {}) {
        return this.init().get(url, config);
    }
};

export default ajax;
