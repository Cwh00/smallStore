<template>
    <div class="Collection">
        <top-nav>
            <template v-slot:default>我的收藏</template>
        </top-nav>
        <div class="content">
            <van-swipe-cell v-for="item in list" :key="item.id">
                <van-card
                    :price="item.goods.price+'.00'"
                    :desc="item.goods.description"
                    :title="item.goods.title"
                    :thumb="item.goods.cover_url"
                />
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell>
        </div>
    </div>
</template>
<script>
    import topNav from 'components/content/topNav';
    import { getCollection } from 'network/collection';
    import { reactive, onMounted, toRefs } from 'vue';
    export default {
        name: 'Collection',
        components: {
            topNav,
        },
        setup() {
            const state = reactive({
                list: []
            })
            const init = ()=>{
                getCollection().then(res=>{
                    state.list = res.data
                })
            }
            onMounted(()=>{
                init();
            })
            return {
                ...toRefs(state)
            }
        }
    }
</script>
<style lang="scss">
.Collection {

    .content {
        margin-top: var(--content-margin-top);
        margin-bottom: var(--content-margin-bottom);
            .van-card{

                .van-card__content {
                    flex-direction: row;
                    align-items: center;
                    .van-card__price {
                        color: red;
                    }
                }
            }
            .van-button {
                height: 100%;
            }
    }
}
</style>