<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerList" :key="item.id">
            <img v-lazy="item.img_url" :alt="item.title">
        </van-swipe-item>
    </van-swipe>
</template>
<script>
    export default {
        name: 'homeBanner',
        props: {
            bannerList: {
                type: Array,
                default() {
                    return [];
                }
            }
        }
    }
</script>
<style lang="scss">
    .my-swipe{
        height: 150px;
        width: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>