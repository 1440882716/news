import request from '@/utils/request'

const userApi = {
    paperPage: '/client/paperInfo/paperPage',
    goodsDetails: '/client/paperInfo/details',



}
export function paperPage(data) {
    return request({
        url: userApi.paperPage,
        method: 'get',
        params: data
    })
}
export function goodsDetails(data) {
    return request({
        url: userApi.goodsDetails,
        method: 'get',
        params: data
    })
}


