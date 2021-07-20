import { request } from './request';

//添加地址
export function addAddress(data) {
    return request({
        url: '/api/address',
        method: 'post',
        data,
    })
}

//获取地址列表
export function getAddressList() {
    return request({
        url: '/api/address',
    })
}
//获取地址详情
export function addressDetail(id) {
    return request({
        url: `/api/address/${id}`,
    })
}
//更新地址
export function updateAddress(id,params) {
    return request({
        url: `/api/address/${id}`,
        method: 'put',
        params
    })
}
//删除地址
export function deleteAddress(id) {
    return request({
        url: `/api/address/${id}`,
        method: 'delete',
    })
}

// export function defaultAddress(id) {
//     return request({
//         url: `/api/address/${id}/default`,
//         method: 'patch',
//     })
// }

