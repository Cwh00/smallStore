<template>
    <div class="goods-item">
        <a href="#" @click.prevent="goDetail(product.id)">
            <img v-lazy="product.cover_url" :alt="product.description">
        </a>
        <div class="goods-info">
            <p>{{product.title}}</p>
            <span class="price"><small>¥</small>{{product.price+'.00'}}</span>
            <span><i class="iconfont icon-shoucang"></i>{{product.collects_count}}</span>
        </div>
    </div>
</template>
<script>
    import { useRouter } from 'vue-router';
    export default {
        name: 'goodsListItem',
        props: {
            product: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        setup() {
            const router = useRouter();
            const goDetail = (id)=>{
                router.push({path:'/detail',query:{id}})
            }
            return {
                goDetail
            }
        }
    }
</script>
<style lang="scss">
    .goods-item {
        width: 40%;
        margin: 10px 0;
        a {
            display: block;
            width: 100%;
            img {
                width: 100%;
            }
        }
        .goods-info{
            width: 100%;
            span {
                margin: 0 5px;
            }
            .price {
                color: red;
            }
        }
    }

</style>