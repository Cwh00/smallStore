import { request } from './request';
//订单预览
export function getOrderPreview() {
    return request({
        url: '/api/orders/preview'
    });
}
//提交订单
export function submitOrder(params) {
    return request({
        url: '/api/orders',
        method: 'post',
        params
    });
}
//订单详情
export function getOrderDetail(order_id) {
    return request({
        url: `/api/orders/${order_id}`,
        params: {
            include: 'user,orderDetails.goods'
        }
    });
}
//订单列表
export function getOrderList(params) {
    return request({
        url: `/api/orders`,
        params
    });
}

//确认收货
export function comfirmReceipt(order_id) {
    return request({
        url: `/api/orders/${order_id}/confirm`,
        method: 'patch'
    });
}

//物流信息
export function getLogisticsInfo(order_id) {
    return request({
        url: `/api/orders/${order_id}/express`,
    });
}