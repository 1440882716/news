import request from '@/utils/request'

const userApi = {
    register: '/client/register',
    getSmsCode: '/client/getSmsCode',
    checkSmsCode: '/client/checkSmsCode',
    isExistMobile: '/client/isExistMobile',
    isExistUserName: '/client/isExistUserName'
}
// 注册
export function register(data) {
    return request({
        url: userApi.register,
        method: 'get',
        params: data
    })
}
// 获取手机短信验证码
export function getSmsCode(data) {
    return request({
        url: userApi.getSmsCode,
        method: 'get',
        params: data
    })
}
// 校验手机验证码
export function checkSmsCode(data) {
    return request({
        url: userApi.checkSmsCode,
        method: 'get',
        params: data
    })
}
// 判断手机号是否存在
export function isExistMobile(data) {
    return request({
        url: userApi.isExistMobile,
        method: 'get',
        params: data
    })
}
// 判断用户名是否存在
export function isExistUserName(data) {
    return request({
        url: userApi.isExistUserName,
        method: 'get',
        params: data
    })
}



