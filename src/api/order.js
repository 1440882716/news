import request from '@/utils/request'

const userApi = {
    orderList: '/client/order/list',
    orderDetail: '/client/order/details',
    orderCancel: '/client/order/cancel',
    orderDel: '/client/order/del',
    reckonOther: '/client/orderBack/reckonOther',
    applyRefund: '/client/orderBack/applyRefund',
    refundList: '/client/orderBack/page'
}
export function refundList(data) {
    return request({
        url: userApi.refundList,
        method: 'get',
        params: data
    })
}
export function applyRefund(data) {
    return request({
        url: userApi.applyRefund,
        method: 'get',
        params: data
    })
}
export function reckonOther(data) {
    return request({
        url: userApi.reckonOther,
        method: 'get',
        params: data
    })
}
export function orderList(data) {
    return request({
        url: userApi.orderList,
        method: 'get',
        params: data
    })
}
export function orderDetail(data) {
    return request({
        url: userApi.orderDetail,
        method: 'get',
        params: data
    })
}
export function orderCancel(data) {
    return request({
        url: userApi.orderCancel,
        method: 'get',
        params: data
    })
}
export function orderDel(data) {
    return request({
        url: userApi.orderDel,
        method: 'get',
        params: data
    })
}






