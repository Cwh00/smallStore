import { request } from './request';

//获取二维码
export function getQRCode(order_id,params) {
    return request({
        url: `/api/orders/${order_id}/pay`,
        params
    });
}


//获取订单支付状态
export function getOrderPayStatus(order_id) {
    return request({
        url: `/api/orders/${order_id}/status`,
    });
}