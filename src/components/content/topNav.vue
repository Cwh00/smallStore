<template>
    <div class="top-nav">
        <div class="left" @click="goback">
            <slot name="left">
                <i class="iconfont icon-fanhui"></i>
            </slot>
        </div>
        <div class="center"><slot></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>
<script>
    import {useRouter} from 'vue-router';
    export default {
        name: 'topNav',
        setup() {
            const router = useRouter();
            const goback = ()=>{
                return router.go(-1);
            }
            return {
                goback
            }
        }
    }
</script>
<style lang="scss">
    .top-nav {
        display: flex;
        color: #fff;
        height: 45px;
        line-height: 45px;
        font-size: 18px;
        background:var(--color-tint);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        .left,.right {
            width: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .left .iconfont {
            font-size: 20px;
        }
        .center {
            flex: 1;
        }
    }

</style>