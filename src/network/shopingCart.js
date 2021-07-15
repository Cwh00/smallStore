import { request } from './request'
//添加购物车
export function addCart(data) {
    return request({
        url: '/api/carts',
        method: 'post',
        data: data
    });
}
//获取购物车
export function getCarts(data='') {
    return request({
        url: '/api/carts?'+data,
    });
}

//修改购物车
export function modifyCart(id,data) {
    return request({
        url: `/api/carts/${id}`,
        method: 'put',
        data: data
    });
}
//移出购物车
export function deleteCart(id) {
    return request({
        url: `/api/carts/${id}`,
        method: 'delete',
    })
}

//修改购物车选中
export function modifyCheckd(data) {
    return request({
        url: '/api/carts/checked',
        method: 'patch',
        data: data
    });
}