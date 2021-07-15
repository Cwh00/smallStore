<template>
    <div class="profile">
        <top-nav>
            <template v-slot:default>个人中心</template>
        </top-nav>
        <div class="content">
            <van-button round block type="primary" native-type="submit" @click="logout">
            退出登录
            </van-button>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'vant';
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router';
    import topNav from 'components/content/topNav';
    import { Logout } from 'network/user';
    export default {
        name: 'Profile',
        components: {
            topNav
        },
        setup() {
            const router = useRouter();
            const store = useStore();
            const logout = ()=>{
                Logout().then((res)=>{
                    if(res.status == 204){
                        Toast.success('退出成功');
                        window.localStorage.setItem('token','');
                        store.commit('setIsLogin',false);
                        setTimeout(()=>{
                            router.push({path: '/login'});
                        },500)
                    }
                })
            }
            return {
                logout
            }
        }
    }
</script>
<style lang="scss">
.profile {

    .content {
        margin-top: 100px;
    }
}

</style>