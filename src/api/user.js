import request from '@/utils/request'

const userApi = {
    updPwd: '/client/user/updPwd',
    updMobile: '/client/user/updMobile',
    updPersonalData: '/client/user/updPersonalData',
    updAvatar: '/client/user/updAvatar',
    userInfo: '/client/user/info',
    delAccount: '/client/user/del',
    newsList: '/client/help/list',
    newsItem: '/client/help/item',
    noticeList: '/client/announce/list',
    noticeDetail: '/client/announce/detail',
    noticeDown: '/mini/announce/download'
}
export function noticeDown(data) {
    return request({
        url: userApi.noticeDown,
        method: 'get',
        responseType: "arraybuffer",
        params: data
    })
}
export function noticeDetail(data) {
    return request({
        url: userApi.noticeDetail,
        method: 'get',
        params: data
    })
}

export function noticeList(data) {
    return request({
        url: userApi.noticeList,
        method: 'get',
        params: data
    })
}
export function newsItem(data) {
    return request({
        url: userApi.newsItem,
        method: 'get',
        params: data
    })
}
export function newsList(data) {
    return request({
        url: userApi.newsList,
        method: 'get',
        params: data
    })
}
export function delAccount(data) {
    return request({
        url: userApi.delAccount,
        method: 'get',
        params: data
    })
}
export function userInfo(data) {
    return request({
        url: userApi.userInfo,
        method: 'get',
        params: data
    })
}
export function updPwd(data) {
    return request({
        url: userApi.updPwd,
        method: 'get',
        params: data
    })
}
export function updMobile(data) {
    return request({
        url: userApi.updMobile,
        method: 'get',
        params: data
    })
}
export function updPersonalData(data) {
    return request({
        url: userApi.updPersonalData,
        method: 'get',
        params: data
    })
}
export function updAvatar(data) {
    return request({
        url: userApi.updAvatar,
        method: 'get',
        params: data
    })
}






