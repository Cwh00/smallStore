<template>
    <div class="register">
        <top-nav>
            <template v-slot:default>新用户注册</template>
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
                    v-model="state.name"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                    />
                    <van-field
                    v-model="state.password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                    />
                    <van-field
                    v-model="state.password_confirmation"
                    type="password"
                    name="确认密码"
                    label="确认密码"
                    placeholder="确认密码"
                    :rules="[{ required: true, message: '请填写确认密码' }]"
                    />
                    <van-field
                    v-model="state.email"
                    type="email"
                    name="email"
                    label="email"
                    placeholder="邮箱"
                    :rules="[{ required: true, message: '请填写邮箱' }]"
                    />
                </van-cell-group>
                <div class="gotoLogin">
                    <a href="#" @click.prevent="$router.push({path: '/login'})">
                        已有账号&nbsp;立即登录
                    </a>
                </div>
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
    import { Notify, Toast } from 'vant';
    import topNav from 'components/content/topNav';
    import { Register } from 'network/user';
    import { useRouter} from 'vue-router';
    import { ref,reactive } from 'vue';
    export default {
        name: 'Register',
        components: {
            topNav
        },
        setup() {
            let state = reactive({
                name: '',
                password: '',
                password_confirmation: '',
                email: ''
            })
            const router = useRouter();
            const onSubmit = ()=>{
                if(state.password != state.password_confirmation) {
                    Notify('确认密码不一致');
                }else{
                    Register(state).then(res=>{
                        if(res && res.status == 201){
                            Toast.success('注册成功');
                            setTimeout(()=>{
                                router.push({path:'/login'})
                            },500)
                            
                        }
                    })                   
                }
            }
            return {
                state,
                onSubmit
            }
        }
    }
</script>
<style lang="scss">
.register {
    .content {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .gotoLogin {
            padding: 0 30px;
            text-align: right;
            a {
                text-align: left;
                font-size: 10px;
                text-decoration: underline;
                color: rgb(11, 179, 179);
            }
            a:active,:hover {color: cyan;}
        }
        .van-button {
            background-color: var(--color-tint);
        }
    }
}

</style>