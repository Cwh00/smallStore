<template>
    <div class="recommend">
        <div class="recommend-item" v-for="item in recommendList.slice(0,4)" :key="item.id">
            <a href="#" @click.prevent="goDetail(item.id,item.description)" >
                <img v-lazy="item.cover_url" :alt="item.description">
                <p>{{item.title}}</p>
            </a>
        </div>
    </div>
</template>
<script>
    import {useRouter} from 'vue-router';
    export default {
        name: 'Profile',
        props: {
            recommendList: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        setup() {
            const router = useRouter();
            const goDetail = (id,desc)=>{
                router.push({path:'/detail',query:{id,desc}})
            }
            return {
                goDetail
            }
        }
    }
</script>
<style lang="scss">
    .recommend {
        width: 100%;
        display: flex;
        padding: 20px 10px;

        border-bottom: 5px solid #999;
        .recommend-item {
            font-size: 14px;
            flex: 1;
            img {
                width: 60px;
                height: 60px;
                margin-bottom: 10px;
            }
        }
    }
</style>