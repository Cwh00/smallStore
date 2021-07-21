<template>
<div>
  <router-view v-slot="{ Component }">
    <keep-alive include="Home,Category">
      <component :is="Component" />
    </keep-alive>
  </router-view> 
  <div id="nav" v-show="$route.meta.isNavShow">
    <router-link to="/" class="nav-item">
      <div class="icon"><i class="iconfont icon-shouye"></i></div>
      <div>首页</div>
    </router-link>
    <router-link to="/category" class="nav-item">
      <div class="icon"><i class="iconfont icon-leimupinleifenleileibie"></i></div>
      <div>分类</div>
    </router-link>
      <router-link to="/shopcart" class="nav-item">
        <van-badge :content="$store.state.cartCount" max="9">
          <div class="icon"><i class="iconfont icon-gouwuche"></i></div>
        </van-badge>
        <div>购物车</div>
      </router-link>
    <router-link to="/profile" class="nav-item">
      <div class="icon"><i class="iconfont icon-wode"></i></div>
      <div>我的</div>
    </router-link>
  </div>
</div>
</template>
<script>
  import { onBeforeMount } from 'vue';
  import { useStore } from 'vuex';
  export default {
    name: 'App',
    setup() {
      const store = useStore();
      onBeforeMount(() => {
        if(window.localStorage.getItem('token')) {
          store.dispatch('updateCartCount')
        }
        
      })
    }
  }
</script>
<style lang="scss">
@import "assets/css/base.css";
@import "assets/css/fontcss/iconfont.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text);
  #nav {
    height: 50px;
    display: flex;
    position: fixed;
    z-index: 10;
    left: 0;
    right: 0;
    bottom: 0;
    background-color:var(--color-tint);
    box-shadow: 0 -2px 3px #999;
    .nav-item {
      height: 50px;
      flex: 1;
      color:var(--color-text);
      padding: 5px 0;
      .icon {
        margin-bottom: 3px;
      }
      .iconfont {
        font-size: 20px;
      }
    }
  }
}

</style>
