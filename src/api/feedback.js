import request from '@/utils/request'

const userApi = {
    addFeedbackUrl: '/client/feedback/add',
    feedbackListUrl: '/client/feedback/page',
    delFeedbackUrl: '/client/feedback/del',
}

export function addFeedback(data) {
    return request({
        url: userApi.addFeedbackUrl,
        method: 'post',
        data: data
    })
}
export function feedbackList(data) {
    return request({
        url: userApi.feedbackListUrl,
        method: 'get',
        params: data
    })
}
export function delFeedback(data) {
    return request({
        url: userApi.delFeedbackUrl,
        method: 'get',
        params: data
    })
}


