//引入axios
import axios from "axios";
//引入消息提示组件
import { Notify } from 'vant';
export function request(config) {
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout: 5000
    });
    //请求拦截
    instance.interceptors.request.use((config)=>{
        //添加身份验证
        const token = window.localStorage.getItem('token');
        if(token){
            config.headers.Authorization = 'Bearer '+token
        }
        return config;
    },(err)=>{
        console.log('请求拦截错误信息'+err);
    })
    //响应拦截
    instance.interceptors.response.use((res)=>{
        return res.data ? res.data : res;
    },(err)=>{
        //请求返回错误信息
        if(err.response) {
            if(err.response.data.errors){
                Notify(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]);
            }
            if(err.response.config.url == '/api/auth/login'){
                if(err.response.status == 401){
                    Notify('账号不存在或密码错误');
                }
            }
        }else{
            console.log('#####响应异常信息')
            console.log(err)
        } 
        
        //针对登录页面请求异常显示消息提示
        
    })
    return instance(config);
}