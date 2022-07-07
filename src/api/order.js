import request from '@/utils/request'

const userApi = {
    orderList: '/client/order/list',
    orderDetail: '/client/order/details',
    orderCancel: '/client/order/cancel',
    orderDel: '/client/order/del',
    reckonOther: '/client/orderBack/reckonOther',
    applyRefund: '/client/orderBack/applyRefund',
    refundList: '/client/orderBack/page',
    cancelBack: '/client/orderBack/cancelBack',
    delBack: '/client/orderBack/del',
    updCertificate: '/client/order/updCertificate',
    updAddressUrl: '/client/order/updAddressUrl',

}
export function updAddress(data) {
    return request({
        url: userApi.updAddressUrl,
        method: 'get',
        params: data
    })
}
export function updCertificate(data) {
    return request({
        url: userApi.updCertificate,
        method: 'get',
        params: data
    })
}
export function delBack(data) {
    return request({
        url: userApi.delBack,
        method: 'get',
        params: data
    })
}
export function cancelBack(data) {
    return request({
        url: userApi.cancelBack,
        method: 'get',
        params: data
    })
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






