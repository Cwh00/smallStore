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
            :price="goods.price"
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
                <van-action-bar-icon icon="cart-o" text="购物车" @click="$router.push({path: '/shopcart'})"/>
                <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
                <van-action-bar-button type="warning" text="加入购物车" @click="addToCart"/>
                <van-action-bar-button type="danger" text="立即购买" />
            </van-action-bar>
            <van-tabs v-model="active">
                <van-tab title="概述" v-html="goods.details"></van-tab>
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
    import { ImagePreview } from 'vant';
    import goodsList from 'components/content/goods/goodsList'
    import { ref,onMounted,toRefs,reactive } from 'vue';
    import { useRoute } from 'vue-router';
    import topNav from 'components/content/topNav';
    import { getGoodsDetail } from 'network/detail';
    import { addCart } from 'network/shopingCart.js';
    import { useStore } from 'vuex';
    import { Toast } from 'vant';
    export default {
        name: 'Detail',
        components: {
            topNav,
            goodsList,
        },
        setup() {
            //选项卡索引
            let active = ref(2);
            //商品详情初始化
            let goodDetails = reactive({
                goods:{},
                like_goods:[]
            })
            const route = useRoute();
            const store = useStore();
            const imgZoom = (img_url)=>{
                ImagePreview({images: [img_url],closeable: true})
            }
            const addToCart = ()=>{
                addCart({goods_id: goodDetails.goods.id,num: 1}).then(res=>{
                    if(res.status == 201 || res.status == 204) {
                        Toast('添加成功');
                        store.dispatch('updateCartCount')
                    }
                });
            }
            onMounted(()=>{
                getGoodsDetail(route.query.id).then(res=>{
                    goodDetails.goods = res.goods
                    goodDetails.like_goods = res.like_goods
                })
                // ImagePreview([
                // 'https://img01.yzcdn.cn/vant/apple-1.jpg',
                // 'https://img01.yzcdn.cn/vant/apple-2.jpg',
                // ]);
            })

            return {
                ...toRefs(goodDetails),
                active,
                imgZoom,
                addToCart
            }
        }
    }
</script>
<style lang="scss">
    .detail {

        .content {
            margin-top: 45px;
                .van-action-bar {
                    z-index: 10;
                }
                .van-card__content {
                    font-size: 14px;
                    align-items: flex-start;
                    div {
                        text-align: left !important;
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
            
            
        }
    }
</style>