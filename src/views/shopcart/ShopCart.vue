<template>
    <div class="shopCart">
        <top-nav>
            <template v-slot:default>购物车</template>
        </top-nav>
        <div class="content">
            <van-checkbox-group v-model="checkedResult" @change="groupChange">
                <van-swipe-cell v-for="item in List" :key="item.id">
                    <div class="good-item" >
                        <van-checkbox :name="item.id"></van-checkbox>
                        <van-card
                            :num="item.goods.stock"
                            :price="item.goods.price+'.00'"
                            :title="item.goods.title"
                            :thumb="item.goods.cover_url"
                            >
                                <template #num>
                                    <van-stepper v-model="item.num" :min="1" :max="item.stock"
                                     :integer="true" theme="round" button-size="20" :name="item.id" async-change
                                     @change="onChange">
                                     </van-stepper>
                                </template>
                        </van-card>
                    </div>
                    <template #right>
                        <van-button square text="删除" type="danger" class="delete-button" @click="deleteGoods(item.id)"/>
                    </template>
                </van-swipe-cell>
            </van-checkbox-group>
            
        </div>
        <van-submit-bar :price="totalPrice * 100" button-text="提交订单" @submit="submitCarts">
            <van-checkbox v-model="checkedAll" @click="allChecked">全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>
<script>
    import { Toast } from 'vant';
    import topNav from 'components/content/topNav';
    import { onBeforeMount, reactive, ref, toRefs, computed } from 'vue';
    import { getCarts,modifyCart,deleteCart,modifyCheckd } from 'network/shopingCart';
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex';
    export default {
        name: 'ShopCart',
        components: {
            topNav
        },
        setup() {
            const store = useStore();
            //初始化数据模型
            const state = reactive({
                List: [],
                checkedResult: [],
                checkedAll: false
            })
            //步进器值改变时
            const onChange = (value,props)=>{
                Toast.loading({message: '修改中',forbidClick: true})
                modifyCart(props.name,{num: value}).then((res)=>{
                    state.List.forEach(item=>{
                        if(item.id == props.name) {
                            item.num = value
                        }
                    })
                    Toast.clear();
                });
            }
            //复选框绑定值改变时调用
            const groupChange = (checkedResult)=>{
                if(state.checkedResult.length == state.List.length){
                    state.checkedAll = true;
                }else{
                    state.checkedAll = false;
                }
                modifyCheckd({cart_ids: checkedResult});
            }
            //全选时处理
            const allChecked = ()=>{
                if(!state.checkedAll){
                    state.checkedResult = []
                }else{
                    state.checkedResult = state.List.map(item=>item.id)
                }
            }
            //删除购物车商品
            const deleteGoods = (id)=>{
                
                deleteCart(id).then(res=>{
                    init();
                    store.dispatch('updateCartCount')
                });
                
            }
            //初始化获取商品请求
            const init = ()=>{
                Toast.loading({message: '加载中',forbidClick: true});
                getCarts('include=goods').then(res=>{
                    state.List = res.data 
                    //获取购物车被选中的商品ID，与选中框双向绑定
                    state.checkedResult = res.data.filter(n=>n.is_checked == 1).map(item=>item.id);
                    Toast.clear();
                })
            }
            //计算选中的商品总价
            const totalPrice = computed(()=>{
                let sum = 0;
                state.List.filter(item=>state.checkedResult.includes(item.id))
                .forEach(item=>{
                    console.log(item)
                    sum += parseInt(item.num) * parseFloat(item.goods.price);
                })
                return sum;
            });
            //提交订单
            const router = useRouter();
            const submitCarts = ()=>{
                if(state.List.length == 0){
                    Toast.fail({message:'购物车没有商品'})
                }else{
                    router.push({path:'/profile'})
                }
            }
            //实例挂载之前，页面还未渲染
            onBeforeMount(() => {
                init();
            })
            return {
                ...toRefs(state),
                onChange,
                groupChange,
                allChecked,
                deleteGoods,
                totalPrice,
                submitCarts
            }

        }
    }
</script>
<style lang="scss">
.shopCart {
    .content {
        margin-top: 50px;
        margin-bottom: 100px;
        .good-item {
            display: flex;
            padding: 0 10px;
            .van-card {
                flex: 1;
                background-color: var(--background-color);
                .van-card__content {
                    align-items: flex-start;
                    padding: 10px 0;
                    .van-card__bottom {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                }
            }
        }
            .van-swipe-cell__right {
                .van-button {
                    height: 100%;
                }
            }
        
    }
    .van-submit-bar {
        bottom: 50px
    }
}

</style>