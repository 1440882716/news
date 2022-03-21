import request from '@/utils/request'

const userApi = {
    addInvoice: '/client/userInvoice/add',
    updInvoice: '/client/userInvoice/update',
    pageData: '/client/userInvoice/getList',
    delInvoice: '/client/userInvoice/del',
    handupInvoice: '/client/receipt/drawer',
    invoiceList: '/client/receipt/list',
    delInvoiceList: '/client/receipt/del',
    query: '/client/receipt/query'
}
export function query(data) {
    return request({
        url: userApi.query,
        method: 'get',
        params: data
    })
}
export function delInvoiceList(data) {
    return request({
        url: userApi.delInvoiceList,
        method: 'get',
        params: data
    })
}
export function invoiceList(data) {
    return request({
        url: userApi.invoiceList,
        method: 'get',
        params: data
    })
}
export function handupInvoice(data) {
    return request({
        url: userApi.handupInvoice,
        method: 'post',
        data: data
    })
}
export function delInvoice(data) {
    return request({
        url: userApi.delInvoice,
        method: 'get',
        params: data
    })
}
export function pageData(data) {
    return request({
        url: userApi.pageData,
        method: 'get',
        params: data
    })
}
export function updInvoice(data) {
    return request({
        url: userApi.updInvoice,
        method: 'post',
        data: data
    })
}
export function addInvoice(data) {
    return request({
        url: userApi.addInvoice,
        method: 'post',
        data: data
    })
}






