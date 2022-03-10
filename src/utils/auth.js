import Cookies from 'js-cookie'

const TokenKey = 'login_key'
const IsLogin = 'is_login'
const AliPay = "ali_pay"

export function getToken() {
    return Cookies.get(TokenKey)
}
export function getLogin() {
    return Cookies.get(IsLogin)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}
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




