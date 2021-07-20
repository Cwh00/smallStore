import { request } from './request';


export function getCollection(page=0) {
    return request({
        url: '/api/collects',
        method: 'get',
        params: {
            page,
        }
    })
}

export function updateCollection(goods) {
    return request({
        url: `/api/collects/goods/${goods}`,
        method: 'post'
    })
}