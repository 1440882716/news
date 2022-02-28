import request from '@/utils/request'

const userApi = {
    address: '/address/add',
}
export function address(data) {
    return request({
        url: userApi.address,
        method: 'get',
        params: data
    })
}



