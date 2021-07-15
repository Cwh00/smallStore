<template>
    <div class="login">
        <top-nav>
            <template v-slot:default>购物车</template>
        </top-nav>
        <div class="content">
            <van-image
            width="10rem"
            height="10rem"
            fit="contain"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field
                    v-model="email"
                    type="email"
                    name="email"
                    label="email"
                    placeholder="邮箱"
                    :rules="[{ required: true, message: '请填写邮箱' }]"
                    />
                    <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                    />
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                    提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'vant';
    import { Login } from 'network/user'
    import topNav from 'components/content/topNav';
    import { useRouter } from 'vue-router';
    import { reactive, toRefs } from 'vue';
    import { useStore } from 'vuex';
    export default {
        name: 'Shopcart',
        components: {
            topNav
        },
        setup() {
            let state = reactive({
                email: '',
                password: ''
            });
            const router = useRouter();
            const store = useStore();
            const onSubmit = ()=>{
                Login(state).then(res=>{
                    if(res){
                        window.localStorage.setItem('token',res.access_token)
                        store.commit('setIsLogin',true)
                        Toast.success('登录成功');
                        setTimeout(()=>{
                            router.push({path:'/profile'})
                        },500)
                    }
                    state.password = ''

                })

            }
            return {
                ...toRefs(state),
                onSubmit
            }
        }
    }
</script>
<style lang="scss">
.login {
    .content {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .van-button {
            background-color: var(--color-tint);
        }
    }
}
</style>