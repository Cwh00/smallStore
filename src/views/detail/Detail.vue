<template>
    <div class="detail">
        <top-nav>
            <template v-slot:default>商品详情</template>
        </top-nav>
        <div class="content">
            <van-image
            width="100%"
            height="300"
            fit="contain"
            :src="goods.cover_url"
            lazy-load
            @click="imgZoom(goods.cover_url)"
            />
            <van-card
            :num="goods.stock"
            :price="goods.price+'.00'"
            :desc="goods.description"
            :title="goods.title"
            >
                <template #tags>
                    <van-tag plain type="danger">标签</van-tag>
                    <van-tag plain type="danger">标签</van-tag>
                </template>
            </van-card>
            <van-action-bar>
                <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
                <van-action-bar-icon v-if="isCollection" icon="star" text="已收藏" color="#ff5000" @click="collection"/>
                <van-action-bar-icon v-else icon="star-o" text="未收藏" color="#ff5000" @click="collection"/>
                <van-action-bar-button type="warning" text="加入购物车" @click="addToCart"/>
                <van-action-bar-button type="danger" text="立即购买" @click="toCart"/>
            </van-action-bar>
            <van-tabs v-model="active">
                <van-tab title="概述" >
                    <div v-html="goods.details"></div>
                </van-tab>
                <van-tab title="热评">
                    <div v-for="item in goods.comments" :key="item"></div>
                </van-tab>
                <van-tab title="相关图书">
                    <goodsList :goods="like_goods"></goodsList>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
    import { ImagePreview,Toast } from 'vant';
    import goodsList from 'components/content/goods/goodsList'
    import { ref,onMounted,toRefs,reactive, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import topNav from 'components/content/topNav';
    import { getGoodsDetail } from 'network/detail';
    import { addCart } from 'network/shopingCart';
    import { updateCollection } from 'network/collection'
    import { useStore } from 'vuex';
    export default {
        name: 'Detail',
        components: {
            topNav,
            goodsList,
        },
        setup() {
            let isCollection = ref(false);
            //选项卡索引
            let active = ref(2);
            //商品详情初始化
            let goodDetails = reactive({
                good_id: '',
                goods:{},
                like_goods:[],
            })
            const route = useRoute();
            const router = useRouter();
            const store = useStore();
            //数据初始化
            const init = ()=>{
                goodDetails.good_id = route.query.id
                getGoodsDetail(goodDetails.good_id).then(res=>{
                    console.log(res);
                    //判断是否、更换图标
                    isCollection.value = res.goods.is_collect == 1 ? true : false
                    
                    goodDetails.goods = res.goods
                    //相关图书商品列表长度是基数时变成偶数
                    if(res.like_goods.length % 2 == 0){
                        goodDetails.like_goods = res.like_goods
                    }else{
                        goodDetails.like_goods = res.like_goods
                        goodDetails.like_goods.pop()
                    }
                    
                })
            }

            //防抖动函数，参数（业务逻辑函数，延时）
            function debounce(func,delay) {
                let t = null;
                return ()=>{
                    if(t != null){
                        clearTimeout(t)
                    }
                    t = setTimeout(()=>{
                        func();
                    },delay)
                }
            }

            //////点击事件调用防抖动函数//////

            //收藏点击更新
            const collection = debounce(()=>{
                updateCollection(goodDetails.good_id).then(res=>{
                    if(res.status == 201){
                        Toast('收藏成功');
                        isCollection.value = true
                    }else if(res.status ==204){
                        Toast('取消成功')
                        isCollection.value = false
                    }
                })
            },300)
            const imgZoom = (img_url)=>{
                ImagePreview({images: [img_url],closeable: true})
            }
            //点击加入购物车
            const addToCart = debounce(()=>{
                addCart({goods_id: goodDetails.goods.id,num: 1}).then(res=>{
                    if(res.status == 201 || res.status == 204) {
                        Toast('添加成功');
                        store.dispatch('updateCartCount')
                    }
                });
            },500)
            
            //点击立即购买
            const toCart = debounce(()=>{
                addCart({goods_id: goodDetails.goods.id,num: 1}).then(res=>{
                    if(res.status == 201 || res.status == 204) {
                        router.push({path: '/shopCart'})
                        store.dispatch('updateCartCount')
                    }
                });
            },500)
            
            onMounted(()=>{
                Toast.loading({message: '正在加载'})
                init();
                Toast.clear();
            })
            //监听路由id更新页面
            watch(()=>route.query.id,()=>{
                //只有在详情页面id变化才重新初始化数据
                if(route.path == '/detail'){
                    init();
                }
            });

            return {
                ...toRefs(goodDetails),
                active,
                imgZoom,
                addToCart,
                toCart,
                isCollection,
                collection
            }
        }
    }
</script>
<style lang="scss">
    .detail {

        .content {
            margin-top: var(--content-margin-top);
            margin-bottom: var(--content-margin-bottom);
                .van-action-bar {
                    z-index: 10;
                }
                .van-card__content {
                    font-size: 14px;
                    align-items: flex-start;
                    div {
                        text-align: left !important;
                        .van-card__price {
                            color: red;
                        }
                        .van-card__title {
                            font-size: 16px;
                            max-height: none;
                            overflow: none;
                            margin: 5px;
                        } 
                    }
                    .van-card__bottom {
                            width: 100%;
                            display :flex;
                            justify-content: space-between;
                        }
                }
                .van-tabs__content {
                        img {
                            max-width: 100%;
                        }
                }
            
        }
    }
</style>