import { request } from './request';

export function getGoodsDetail(good_id) {
    return request({
        url: 'api/goods/'+good_id
    })
}