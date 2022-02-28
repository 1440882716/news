import request from '@/utils/request'

const userApi = {
    banner: '/goods/app/index/banner',
    DeleteGoods: '/storehouse/goods/delGoods',



}
export function goodsInfo(data) {
    return request({
        url: userApi.banner,
        method: 'get',
        params: data
    })
}
export function delData(data) {
    return request({
        url: userApi.DeleteGoods,
        method: 'get',
        params: data
    })
}


