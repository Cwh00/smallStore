import { request } from './request'

export function getUserMeans() {
    return request({
        url: '/api/user'
    })
}

export function updateMeans(data) {
    return request({
        url: '/api/user',
        method: 'put',
        data: data
    })
}

export function updateHeadPortrait(data) {
    return request({
        url: '/api/user/avatar',
        method: 'patch',
        data: data
    })
}