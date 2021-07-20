<template>
    <div class="profile">
        <top-nav>
            <template v-slot:default>个人中心</template>
        </top-nav>
        <div class="content">
            <div class="personal-card">
                <div class="head-portrait">
                    <img v-lazy="means.avatar_url" alt="">
                </div>
                <div class="means">
                    <p>昵称：<span>{{means.name}}</span></p>
                    <p>登录名：<span>{{means.email}}</span></p>
                    <p>个性签名：<span>这个人很懒什么都没留下</span></p>
                </div>
            </div>
            <ul class="information-list">
                <li class="item" v-for="item in [{title:'我的收藏',path:'/collection'},
                                                 {title:'我的订单',path:'/order'},
                                                 {title:'地址管理',path:'/Management'},
                                                 {title:'关于我们',path:'/about'}]" :key="item" 
                                                @click='goTo(item.path)'>
                    <span>{{item.title}}</span><img src="~assets/images/next.png" alt="">
                </li>
            </ul>
            <van-button round block type="primary" native-type="submit" @click="logout">
            退出登录
            </van-button>
        </div>
    </div>
</template>
<script>
    import { getUserMeans, updatteMeans, updateHeadPortrait} from 'network/personal'
    import { Toast } from 'vant'; 
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router';
    import topNav from 'components/content/topNav';
    import { Logout } from 'network/user';
    import { reactive, onMounted, toRefs } from 'vue';
    export default {
        name: 'Profile',
        components: {
            topNav
        },
        setup() {
            const router = useRouter();
            const store = useStore();
            const state = reactive({
                means: {}
            
            })
            const goTo = (path)=>{
                console.log(path)
                router.push({path})
            }
            const logout = ()=>{
                Logout().then((res)=>{
                    if(res.status == 204){
                        Toast.success('退出成功');
                        window.localStorage.setItem('token','');
                        store.commit('setIsLogin',false);
                        store.commit('modifyCartCount',{num: 0})
                        setTimeout(()=>{
                            router.push({path: '/login'});
                        },500)
                    }
                })
            }
            onMounted (()=>{
                getUserMeans().then((res)=>{
                    state.means = res
                })
            })
            return {
                logout,
                goTo,
                ...toRefs(state)
            }
        }
    }
</script>
<style lang="scss">
.profile {

    .content {
        margin-top: var(--subcontent-margin-top);
        padding: 0 10px;
        .personal-card {
            height: 150px;
            border-radius: 15px;
            background-image: linear-gradient(to right, #08d8bb, #85bdb6);;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            padding: 20px;
            box-shadow: 1px 1px 2px 3px rgb(235, 235, 235);
            .head-portrait {
                width: 70px;
                height: 70px;
                border-radius: 50px;
                background: #999;
                overflow: hidden;
                margin: 0 10px;
                text-align: center;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .means {
                p {
                    color: rgb(240, 240, 240);
                    text-align: left;
                    font-size: 14px;
                    margin: 5px 0 ;

                }
                
            }
        }
        .information-list {

            li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                line-height: 40px;
                height: 40px;
                width: 100%;
                margin-bottom: 20px;
                background-color: #fff;
                padding: 0 10px;
                font-size: 14px;
                box-shadow: 0 1px 1px 1px rgb(235, 235, 235,0.8);
                border-radius: 5px;
                img {
                    width: 15px;
                    height: 20px;
                }
            }
        }
        .van-button {
            background-color: var(--color-tint);
        }
    }
}

</style>