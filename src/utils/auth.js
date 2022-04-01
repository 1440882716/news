import Cookies from 'js-cookie'

const TokenKey = 'login_key'
const IsLogin = 'is_login'
const AliPay = "ali_pay"
const orderList = 'order-list'

export function getToken() {
    return Cookies.get(TokenKey)
}
export function getLogin() {
    return Cookies.get(IsLogin)
}
export function getOrList() {
    return Cookies.get(orderList)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

// export function setOrList(data) {
//     let idArr = []
//     idArr = getOrList()
//     idArr.push(data)
//     return Cookies.set(orderList, idArr)
// }
export function hasLogin() {
    return Cookies.set(IsLogin, true)
}

export function setAlipay(payUrl) {
    return Cookies.set(AliPay, payUrl)
}


export function removeToken() {
    return Cookies.remove(TokenKey)
}
export function removeLogin() {
    return Cookies.set(IsLogin, false)
}




