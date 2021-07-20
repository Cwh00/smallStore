<template>
    <div class="order-detail">
        <top-nav>
            <template v-slot:default>订单详情</template>
        </top-nav>
        <div class="content">
           <div class="order-pay-card">
                <div><span>订单状态：</span><span>{{orderState}}</span></div>
                <div><span>订单编号：</span><span>{{Detail.order_no}}</span></div>
                <div><span>下单时间：</span><span>{{Detail.created_at}}</span></div>
                <div><van-button v-show="Detail.status == 1" class="pay-button" @click="pay">
                    去支付
                </van-button></div>
                <div><van-button v-show="Detail.status == 2" @click="takeOk">
                    确认收货
                </van-button></div>
           </div>
           <div class="goods-info">
                <div><span>商品金额：</span><span><small>¥</small>{{total}}</span></div>
                <div><span>物流信息：</span><span>普通快递</span></div>
            </div>
            <div class="goods-list">
                <van-card v-for="(item,index) in Detail.orderDetails.data" :key="index"
                :num="item.num"
                :price="item.goods.price"
                :title="item.goods.title"
                :thumb="item.goods.cover_url"
                lazy-load
                />
            </div>
        </div>
        <van-popup :show="popupShow" closeable position="bottom" @click-close-icon="close">
                <van-grid :border="false" :column-num="2">
                    <van-grid-item>
                        支付宝支付<br>
                        <van-image :src="aliyun" />
                    </van-grid-item>
                    <van-grid-item>
                        微信支付<br>
                        <van-image :src="wechat" />
                    </van-grid-item>
                </van-grid>
            </van-popup>
        
    </div>
</template>
<script>
    import topNav from 'components/content/topNav';
    import { Toast,Dialog } from 'vant';
    import { getOrderDetail } from 'network/order';
    import { getQRCode, getOrderPayStatus } from 'network/payment';
    import { reactive, onMounted, toRefs, computed} from 'vue';
    import { useRoute } from 'vue-router';
    export default {
        name: 'OrderDetail',
        components: {
            topNav,
        },
        setup() {
            const route = useRoute();
            const state = reactive({
                order_id: '',
                aliyun: '',
                wechat: '',
                timer: '',
                popupShow: false,
                Detail: {
                    orderDetails: {
                        data:[]
                    }
                },
            })
            const init = ()=>{
                Toast.loading({message: '加载中'});
                state.order_id = route.query.order_id
                getOrderDetail(state.order_id).then(res=>{
                    console.log(res);
                    state.Detail = res
                    Toast.clear();
                });
            }
            onMounted(() => {
                init()
            });
            const orderState = computed(()=>{
                let states = ['','已下单','已支付','已发货','已收货','已过期'];
                return states[state.Detail.status]
            });
            const total = computed(()=>{
                let sum = 0;
                state.Detail.orderDetails.data.forEach(item=>{
                    sum += item.num * item.price
                })
                return sum;
            })
            const pay  = ()=>{
                state.aliyun = '';
                state.wechat = '';
                state.popupShow = true
                //获取支付二维码
                getQRCode(state.order_id,{type: 'aliyun'}).then(res=>{
                        console.log(res)
                        state.aliyun = res.qr_code_url
                        state.wechat = res.qr_code_url
                    })
                //轮巡检查支付状态
                // 20210719175443454389
                // 20210719175658683134
                // https://api.shop.eduwork.cn/storage/qr_code/28dae69b080e631ba2a3ec00e96b271d.png
                // https://api.shop.eduwork.cn/storage/qr_code/28dae69b080e631ba2a3ec00e96b271d.png
                // https://api.shop.eduwork.cn/storage/qr_code/28dae69b080e631ba2a3ec00e96b271d.png
                // //控制轮巡次数
                let count = 0;
                state.timer = setInterval(()=>{
                    if(count < 5) {
                        getOrderPayStatus(state.order_id).then(res=>{
                            if(res.status == '2'){
                                clearInterval(state.timer);
                                // router.push({path: '/orderDetail',query:{order_id:state.order_id}});
                            }
                        })
                    }else{
                        clearInterval(state.timer);
                        Toast.fail({message: '支付超时'});
                        state.popupShow = false
                        // setTimeout(()=>{
                            // router.push({path: '/orderDetail',query:{order_id:state.order_id}});
                        // },1500)
                    }
                    count++
                },2000)
            }
            const close = ()=>{
                Toast.fail({message: '支付取消'});
                state.popupShow = false;
                clearInterval(state.timer);
                // router.push({path: '/orderDetail',query:{order_id:state.order_id}});
            }
            const takeOk = ()=>{
                Dialog.confirm({
                title: '是否确认收货',
                })
                .then(() => {
                    // on confirm
                })
                .catch(() => {
                    // on cancel
                });
            }
            return {
                ...toRefs(state),
                orderState,
                total,
                pay,
                close,
                takeOk
            }

        }
    }
</script>
<style lang="scss">
.order-detail {

    .content {
        background-color: rgb(245, 245, 245);
        margin-top: var(--content-margin-top);
        .order-pay-card {   
            background-color: #fff;
            padding: 10px 10px;
            box-shadow: 0 1px 1px rgb(200, 200, 200);
            margin-bottom: 20px;
            div {
                padding-bottom: 5px;
                width:100%;
                text-align: left;
            }
            .van-button {
                width: 100%;
            }
            .pay-button {
                color: #fff;
                background-color: var(--color-tint);
            }
            
        }
        .goods-info {
            width: 100%;
            padding: 10px 10px;
            background-color: #fff;
            margin-bottom: 20px;
            div {
                text-align: left;
                margin-bottom: 10px;
            }
        }
        .goods-list {
            .van-card__content{
                flex-direction: row;
                padding: 10px 0;
                // align-items: center;
                .van-card__bottom {
                    display: flex;
                    flex-direction: column-reverse;
                    justify-content: space-between;
                    .van-card__price {
                        color: red;
                    }
                }
            }
        }
    }
}
</style>