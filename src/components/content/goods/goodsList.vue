<template>
    <div v-if="goods.length > 0" class="goodsList">
        <goods-list-item  v-for="item in goods" :product="item" :key="item"></goods-list-item>
    </div>
    <div v-else >没有相关图书</div>
</template>
<script>
    import goodsListItem from './goodsListItem';
    export default {
        name: 'goodsList',
        props: {
            goods: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        components: {
            goodsListItem
        }
    }
</script>
<style lang="scss">
    .goodsList {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

</style>