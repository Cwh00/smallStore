import { request } from './request';

export function getGoods() {
    return request({
        url: '/api/goods'
    })
}
export function getCurrentGoods(order='sales',category_id=0,page=1) {
    return request({
        url: 'api/goods?category_id='+category_id+'&page='+page+'&'+order+'=1'
    })
}
