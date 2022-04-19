import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken, removeToken, removeLogin } from "@/utils/auth";
import qs from "qs";
import router from "@/router";

// create an axios instance
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    baseURL: "https://admin.cdzkzs.top",
    // baseURL: 'http://192.168.31.9:8080',
    // baseURL: 'http://192.168.31.114:8080',
    // baseURL: 'http://192.168.31.16:8080',
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        config.headers["Authorization"] = getToken();
        if (config.method == 'post') {
            config.data = qs.stringify(config.data);
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        // const res = response.data
        // if (res.code !== 0 && res.code !== 200) {
        //     // Notify({ type: 'danger', message: res.message||res.msg });
        //     // 401:未登录;
        //     if (res.code === 401) {
        //         //   Notify({ type: 'danger', message: '请登录'});
        //     }
        //     // return Promise.reject('error')
        //     return Promise.reject(res.message)
        // } else {
        //     return res
        // }
        return new Promise((resolve, reject) => {
            const res = response.data;
            resolve(res);
        });
    },
    error => {
        // Message({
        //     message: error.message,
        //     type: "error",
        //     duration: 3 * 1000
        // });

        if (error.response.status == 401) {
            router.replace("/login");
            removeToken();
            removeLogin();
        }
        return Promise.reject(error)

    }
);

export default service
