import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

// create an axios instance
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    baseURL: 'http://192.168.31.107:9000',
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

        if (config.method == 'post') {


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
        const res = response.data
        if (res.code !== 0 && res.code !== 200) {
            // Notify({ type: 'danger', message: res.message||res.msg });
            // 401:未登录;
            if (res.code === 401) {
                //   Notify({ type: 'danger', message: '请登录'});
            }
            // return Promise.reject('error')
            return Promise.reject(res.message)
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error); // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return new Promise((resolve, reject) => {
            return reject(error);
        });
    }
);

export default service
