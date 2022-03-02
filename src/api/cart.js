import request from '@/utils/request'

const userApi = {
    addCart: '/cart/add',
    updateCart: '/cart/update',
    delCart: '/cart/del',
    cartList: '/cart/list'
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



