<template>
    <div class="order-preview">
        <top-nav>
            <template v-slot:default>订单预览</template>
        </top-nav>
        <div class="content">
            <div class="address-card" @click="goTo">
                <div class="address-info">
                    <p v-show="address.address">{{address.address}}</p>
                    <span>{{address.name}}</span><span>{{address.phone}}</span>
                    <p>{{address.province}} {{address.city}} {{address.county}}</p>
                </div>
                <img src="~assets/images/next.png" alt="">
            </div>
            <div class="order-content">
                <van-card
                :num="item.num"
                :price="item.goods.price+'.00'"
                desc=""
                :title="item.goods.title"
                :thumb="item.goods.cover_url"
                lazy-load
                v-for="item in carts" :key="item.id"
                />
            </div>
            <van-submit-bar :price="total * 100" button-text="提交订单" @submit="onSubmit" />
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
    </div>
</template>
<script>
    import { Toast } from 'vant';
    import { useRouter } from 'vue-router';
    import topNav from 'components/content/topNav';
    import { onMounted, reactive, toRefs, computed } from 'vue';
    import { getOrderPreview, submitOrder } from 'network/order';
    import { getQRCode, getOrderPayStatus } from 'network/payment';
    import { useStore } from 'vuex';
    export default {
        name: 'OrderPreview',
        components: {
            topNav,
        },
        setup() {
            const router = useRouter();
            const store = useStore();
            const state = reactive({
                address: {},
                carts: [],
                popupShow: false,
                order_id: '',
                aliyun: '',
                wechat: '',
                timer: ''
            })
            const init = ()=>{
                Toast.loading({message: '正在加载',forbidClick: true});
                getOrderPreview().then(res=>{
                    console.log(res);
                    let address = res.address.filter(n=>n.is_default == 1);
                    if(res.address.length == 0) {
                        state.address = {
                            address: '还没有默认地址，请设置或添加默认地址'
                        }
                    }else{
                        state.address = address[0]
                    }
                    state.carts = res.carts
                    Toast.clear();
                })
                
            }
            const goTo = ()=>{
                router.push({path: '/management'})
            }
            const total = computed(()=>{
                let sum = 0;
                state.carts.forEach(item=>{
                    sum += parseInt(item.num) * parseFloat(item.goods.price)
                })

                return sum;
            })
            const onSubmit = ()=>{
                const params = {
                    address_id: state.address.id
                }
                submitOrder(params).then(res=>{
                    
                    Toast.success({message: '创建订单成功'});
                    store.dispatch('updateCartCount');
                    
                    state.popupShow = true
                    //获取订单号
                    
                    state.order_id = res.id
                    
                    getQRCode(state.order_id,{type: 'aliyun'}).then(res=>{
                        state.aliyun = res.qr_code_url
                        state.wechat = res.qr_code_url
                    })

                    //轮巡检查支付状态
                    //控制轮巡次数
                    let count = 0;
                    state.timer = setInterval(()=>{
                        if(count < 5) {
                            getOrderPayStatus(state.order_id).then(res=>{
                                if(res.status == '2'){
                                    clearInterval(state.timer);
                                    router.push({path: '/orderDetail',query:{order_id:state.order_id}});
                                }
                            });
                        }else{
                            clearInterval(state.timer);
                            Toast.fail({message: '支付超时'});
                            state.popupShow = false
                            setTimeout(()=>{
                                router.push({path: '/orderDetail',query:{order_id:state.order_id}});
                            },1500)
                        }
                        count++
                    },2000)
                })
            }
            onMounted(()=>{
                init();
            })
            //弹出层关闭事件
            const close = ()=>{
                Toast.fail({message: '支付取消'});
                state.popupShow = false;
                clearInterval(state.timer);
                router.push({path: '/orderDetail',query:{order_id:state.order_id}});
            }
            return {
                ...toRefs(state),
                goTo,
                total,
                onSubmit,
                close
            }
        }
    }
</script>
<style lang="scss">
.order-preview {
    .content {
        margin-top: var(--content-margin-top);
        * {
            text-align: left;
        }
        .address-card {
            width: 100%;
            height: 100px;
            box-shadow: 0 1px 1px rgb(200, 200, 200);
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .address-info {
                flex: 1;
                span {
                    margin: 0 5px 5px 0;
                }
            }
            img {
                width: 20px;
                height: 20px;
            }
        }
        .order-content {
            padding: 10px 0;
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
        .van-submit-bar {
            bottom: 50px
        }
    }
}
</style>