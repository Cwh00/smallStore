import { request } from './request';

export function Register(data) {
    return request({
        url: '/api/auth/register',
        method: 'post',
        data: data
    })
}
export function Login(data) {
    return request({
        url: '/api/auth/login',
        method: 'post',
        data: data
    })
}
export function Logout() {
    return request({
        url: '/api/auth/logout',
        method: 'post',
    })
}
