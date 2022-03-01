import request from '@/utils/request'

const userApi = {
    loginSmsCode: '/client/loginSmsCode',
    loginPwd: '/client/loginPwd',
    forgetPwd: '/client/forgetPwd'
}
export function loginSmsCode(data) {
    return request({
        url: userApi.loginSmsCode,
        method: 'get',
        params: data
    })
}
export function loginPwd(data) {
    return request({
        url: userApi.loginPwd,
        method: 'get',
        params: data
    })
}
export function forgetPwd(data) {
    return request({
        url: userApi.forgetPwd,
        method: 'get',
        params: data
    })
}



