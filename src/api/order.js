import request from '@/utils/request'

const userApi = {
    orderList: '/client/order/list',
    orderDetail: '/client/order/details',
    orderCancel: '/client/order/cancel',
    orderDel: '/client/order/del',
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






