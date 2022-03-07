import request from '@/utils/request'

const userApi = {
    addAddress: '/client/address/add',
    addList: '/client/address/addList',
    updateAdd: '/client/address/update',
    delAdd: '/client/address/del',
    setDefault: '/client/address/setDefault'
}
export function setDefault(data) {
    return request({
        url: userApi.setDefault,
        method: 'get',
        params: data
    })
}
export function addAddress(data) {
    return request({
        url: userApi.addAddress,
        method: 'post',
        data: data
    })
}
export function addList(data) {
    return request({
        url: userApi.addList,
        method: 'get',
        params: data
    })
}
export function updateAdd(data) {
    return request({
        url: userApi.updateAdd,
        method: 'post',
        data: data
    })
}
export function delAdd(data) {
    return request({
        url: userApi.delAdd,
        method: 'get',
        params: data
    })
}



