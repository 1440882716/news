import request from '@/utils/request'

const userApi = {
    addCard: '/client/bankCard/add',
    updCard: '/client/bankCard/upd',
    delCard: '/client/bankCard/del',
    cardList: '/client/bankCard/all',
}
export function cardList(data) {
    return request({
        url: userApi.cardList,
        method: 'get',
        params: data
    })
}
export function delCard(data) {
    return request({
        url: userApi.delCard,
        method: 'get',
        params: data
    })
}
export function updCard(data) {
    return request({
        url: userApi.updCard,
        method: 'get',
        params: data
    })
}
export function addCard(data) {
    return request({
        url: userApi.addCard,
        method: 'get',
        params: data
    })
}




