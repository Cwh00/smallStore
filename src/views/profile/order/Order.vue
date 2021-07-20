<template>
    <div class="my-order">
        <top-nav>
            <template v-slot:default>我的订单</template>
        </top-nav>
        <div class="content">
            <van-tabs @click="switchStatus">
                <van-tab v-for="(item,index) in ['全部','未付款','已付款','已发货','已收货','已过期']" :title="item" :key="index">
                    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                        <van-list 
                        v-model:loading="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                        offset="10"
                        :immediate-check="false"
                        >
                            <div class="order-info-card" v-for="item in list" :key="item.id">
                                <div class="order-info">
                                    <div class="order-info-left">
                                        <div><h4>订单编号：</h4><span>{{item.order_no}}</span></div>
                                        <div><h4>创建时间：</h4><span>{{item.created_at}}</span></div>
                                    </div>
                                    <div class="order-info-right" @click="goTo('/orderDetail',{order_id:item.id})">
                                        <h4>订单详请</h4>
                                        <img src="~assets/images/next.png" alt=""/>
                                    </div>
                                </div>
                                <div class="goods-info" v-for="subItem in item.orderDetails.data" :key="subItem.id" @click="goTo('/detail',{id:subItem.goods.id})">
                                    <div class="goods-img-box"><img :src="subItem.goods.cover_url" alt=""></div>
                                    <h4>{{subItem.goods.title}}</h4>
                                    <div class="goods-info-right">
                                        <div><small>×</small>{{subItem.num}}</div>
                                        <div class="goods-price">
                                            <small>¥</small>{{subItem.num * subItem.goods.price+'.00'}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-list>
                    </van-pull-refresh>
                </van-tab>
            </van-tabs>
        </div>
        <back-top @backTop="backTop" v-show="isBackTopShow"></back-top>
    </div>
</template>
<script>
    import backTop from 'components/common/backTop';
    import topNav from 'components/content/topNav';
    import { getOrderList } from 'network/order';
    import { useRouter } from 'vue-router';
    import { toRefs, reactive, onMounted, ref, nextTick } from 'vue';
    export default {
        name: 'Order',
        components: {
            topNav,
            backTop
        },
        setup() {
            const router = useRouter();
            const state = reactive({
                refreshing: false,
                loading: false,
                finished: false,  
                list: [],
                page: 1,
                status: 0,
                totalPage: 0,
                isBackTopShow: false,
            })
            const init = ()=>{
                getOrderList({page:state.page,status:state.status,include:'orderDetails.goods'}).then(res=>{
                    state.totalPage = res.meta.pagination.total_pages
                    state.list.push(...res.data)
                    state.loading = false;
                    console.log(state.page)
                    state.page += 1
                    if(state.page > state.totalPage){
                        state.finished = true
                    }
                })

            }
            
            onMounted(() => {
                onRefresh()
            })
            const backTop = ()=>{
                    // window.scrollTo(0,0)
                    onRefresh();
                } 
            const onLoad = () => {
                if(state.refreshing) {
                    state.list = []
                    state.refreshing = false
                }
                
                init();

                if(state.page >= 2) {
                    state.isBackTopShow = true
                }
            };

            const onRefresh = () => {
                //隐藏回到顶部按钮
                state.isBackTopShow = false
                //设置为加载状态
                state.refreshing = true
                //当已加载完成时，下拉刷新需要清除加载完成状态
                state.finished = false
                //设置为加载状态
                state.loading = true
                //重置页数调用上拉加载
                state.page = 1
                onLoad();
            };
            //切换选项卡
            const switchStatus = (name)=>{
                state.status = name
                onRefresh();
            }
            //跳转
            const goTo = (path,query)=>{
                router.push({path,query})
            }
            return {
                ...toRefs(state),
                onLoad,
                onRefresh,
                switchStatus,
                goTo,
                backTop,
            }
        }
    }
</script>
<style lang="scss">
.my-order {

    .content {
        margin-top: var(--content-margin-top);
        .van-list {
            padding: 0 10px;
            margin-bottom: 60px;
            .order-info-card {
            width: 100%;
            margin: 10px 0;
            border-radius: 15px;
            box-shadow: 0px 1px 1px rgb(221, 221, 221);
            background: rgb(245,245,245);
                .order-info {
                    width: 100%;
                    background-color: rgb(230,230,230);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-top-right-radius: 15px;
                    border-top-left-radius: 15px;
                    padding: 10px;
                    font-size: 15px;

                    .order-info-left div{
                        display: flex;
                    }

                    .order-info-right {
                        display: flex;
                        align-items: center;
                        img {
                        width: 20px;
                        height: 20px;
                        }
                    }
                }
                
            }
            .goods-info {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px;
                .goods-img-box {
                    padding: 5px;
                    background-color: #fff;
                    img {
                        width: 70px;
                        height: 70px;
                    }
                }
                .goods-info-right {
                    height: 50px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-end;
                    .goods-price {
                        color: red;
                    }
                }
            }
        }
    }
}
</style>