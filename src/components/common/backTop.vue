<template>
    <div class="backTop" @click="backTop"></div>
</template>
<script>
    export default {
        name: 'backTop',
        setup(props,{ emit }) {
            return {
                backTop:()=>{
                    emit('backTop')
                }
            }
        }
    }
</script>
<style>
    .backTop {
        background:rgb(255,255,255,0.7) url('~assets/images/top.png')center center no-repeat;
        background-size: 100%;
        box-shadow: 5px 5px 5px rgb(167, 165, 165);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        position:absolute;
        bottom: 65px;
        right: 25px;
    }
</style>