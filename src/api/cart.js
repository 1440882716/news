import request from '@/utils/request'

const userApi = {
    addCart: '/client/cart/add',
    updateCart: '/client/cart/update',
    delCart: '/client/cart/del',
    cartList: '/client/cart/list',
    confirmUrl: '/client/cart/confirm',
    createOrder: '/client/order/create',
    orderPay: '/client/order/pay',
    wxPay: '/client/wxPay/scanCode',
    unionPay: '/client/unionPay',
    directBuy: '/client/cart/direct',
    approve: '/client/cart/approve',
    payQuery: '/client/pay/query'
}
export function payQuery(data) {
    return request({
        url: userApi.payQuery,
        method: 'get',
        params: data
    })
}
export function approve(data) {
    return request({
        url: userApi.approve,
        method: 'get',
        params: data
    })
}
export function directBuy(data) {
    return request({
        url: userApi.directBuy,
        method: 'post',
        data: data
    })
}
export function unionPay(data) {
    return request({
        url: userApi.unionPay,
        method: 'get',
        params: data
    })
}
export function wxPay(data) {
    return request({
        url: userApi.wxPay,
        method: 'get',
        params: data
    })
}
export function orderPay(data) {
    return request({
        url: userApi.orderPay,
        method: 'get',
        params: data
    })
}
export function createOrder(data) {
    return request({
        url: userApi.createOrder,
        method: 'post',
        data: data
    })
}
export function addCart(data) {
    return request({
        url: userApi.addCart,
        method: 'post',
        data: data
    })
}
export function updateCart(data) {
    return request({
        url: userApi.updateCart,
        method: 'post',
        data: data
    })
}
export function delCart(data) {
    return request({
        url: userApi.delCart,
        method: 'get',
        params: data
    })
}
export function cartList(data) {
    return request({
        url: userApi.cartList,
        method: 'get',
        params: data
    })
}
export function confirmUrl(data) {
    return request({
        url: userApi.confirmUrl,
        method: 'get',
        params: data
    })
}



