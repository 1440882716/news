import request from '@/utils/request'

const userApi = {
    addCart: '/client/cart/add',
    updateCart: '/client/cart/update',
    delCart: '/client/cart/del',
    cartList: '/client/cart/list',
    confirmUrl: '/client/cart/confirm',
    createOrder: '/client/order/create'
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



