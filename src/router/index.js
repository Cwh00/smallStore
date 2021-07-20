import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import { Toast } from 'vant'
const Home = ()=>import ('views/home/Home');
const Category = ()=>import ('views/category/Category');
const Detail = ()=>import ('views/detail/Detail');
const Profile = ()=>import ('views/profile/Profile');
const ShopCart = ()=>import ('views/shopcart/ShopCart');
const Register = ()=>import ('views/profile/Register');
const Login = ()=>import ('views/profile/Login');
const Management = ()=>import ('views/profile/address/Management');
const EditAddress = ()=>import ('views/profile/address/editAddress');
const About = ()=>import ('views/profile/About');
const OrderPreview = ()=>import ('views/profile/order/OrderPreview');
const OrderDetail = ()=>import ('views/profile/order/OrderDetail');
const Order = ()=>import ('views/profile/order/Order');
const Collection = ()=>import ('views/profile/collection/Collection');
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '图书商城-首页',
      isNavShow: true
    }
  },
  {
    path: '/category',
    name: 'Category',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Category,
    meta: {
      title: '图书商城-商品分类',
      isNavShow: true
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Detail,
    
    meta: {
      title: '图书商城-商品详情',
      isNavShow: false,
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Profile,
    meta: {
      title: '图书商城-个人中心',
      isNavShow: true,
      isAuthentication: true
    }
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ShopCart,
    meta: {
      title: '图书商城-购物车',
      isNavShow: true,
      isAuthentication: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: '图书商城-新用户注册',
      isNavShow: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '图书商城-用户登录',
      isNavShow: true
    }
  },
  {
    path: '/orderPreview',
    name: 'OrderPreview',
    component: OrderPreview,
    meta: {
      title: '图书商城-订单预览',
      isNavShow: true
    }
  },
  {
    path: '/orderDetail',
    name: 'OrderDetail',
    component: OrderDetail,
    meta: {
      title: '图书商城-订单详情',
      isNavShow: true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      title: '图书商城-我的订单',
      isNavShow: true
    }
  },
  {
    path: '/collection',
    name: 'Collection',
    component: Collection,
    meta: {
      title: '图书商城-我的收藏',
      isNavShow: true
    }
  },
  {
    path: '/editAddress',
    name: 'EditAddress',
    component: EditAddress,
    meta: {
      title: '图书商城-编辑地址',
      isNavShow: true
    }
  },
  {
    path: '/management',
    name: 'Management',
    component: Management,
    meta: {
      title: '图书商城-地址管理',
      isNavShow: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '图书商城-关于我们',
      isNavShow: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  document.title = to.meta.title;
  if(to.meta.isAuthentication && store.state.user.isLogin === false) {
    Toast('请先登录');
    next('/login');
  }else{
    next();
  }
})
export default router
