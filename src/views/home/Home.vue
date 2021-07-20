<template>
    <div class="home">
        <top-nav>
            <template v-slot:left></template>
            <template v-slot:default>图书商城</template>
        </top-nav>
        
        <tab-control :currentIndex="tabCurrentIndex" v-show="isTabFixed" @tabClick="tabClick" :tabTitles="['畅销','新书','精选']"></tab-control>
        <div class="wrapper">
            <div class="content">
                <home-banner :bannerList="bannerList"></home-banner>
                <recommend :recommendList="recommendList"></recommend>
                <tab-control :currentIndex="tabCurrentIndex" @tabClick="tabClick" :tabTitles="['畅销','新书','精选']"></tab-control>
                <goodsList :goods="showGoods"></goodsList>
            </div>
        </div>
        <back-top v-show="isBackTopShow" @backTop="backTop"></back-top>
    </div>
</template>
<script>
    import BScroll from 'better-scroll';
    import { onMounted,reactive,ref,computed,watchEffect,nextTick } from 'vue';
    import { getHomeAllData, getHomeGoods } from 'network/home.js';
    import topNav from 'components/content/topNav';
    import recommend from 'views/home/childComps/recommend';
    import tabControl from 'components/content/tabControl';
    import goodsList from 'components/content/goods/goodsList';
    import backTop from 'components/common/backTop';
    import homeBanner from 'views/home/childComps/homeBanner.vue';
    export default {
        name: 'Home',
        setup(props,context) {
            /////横幅模块初始化/////
            let bannerList = ref([]);


            /////推荐书模块初始化/////
            //初始化推荐书数据
            let recommendList = ref([]);


            /////选项卡模块初始化/////
            let isTabFixed = ref(false);
            //俩个选项卡同步绑定
            const tabCurrentIndex = ref(0)

            //初始化返回顶部按钮
            let isBackTopShow = ref(false);

            //初始化选项卡内容数据
            const goods = reactive({
                sales:{page:1,list:[]},
                recommend:{page:1,list:[]},
                new:{page:1,list:[]},
            });
            //初始化当前选项卡页的类型
            const currentType = ref('sales');

            //点击事件获取索引，通过索引改变选项卡类型
            const tabClick = (index)=>{
                    tabCurrentIndex.value = index
                    let goodsType = ['sales','new','recommend'];
                    currentType.value = goodsType[index]
                    //切换选项卡渲染完成后重新计算高度
                    nextTick(()=>{
                        bscroll && bscroll.refresh()
                    });
                }
            //将当前选项卡数据返回，子组件接收遍历它
            const showGoods = computed(()=>{
                return goods[currentType.value].list
            })
            //初始化bscroll
            let bscroll = reactive({});

            onMounted(()=>{
                getHomeAllData().then(res=>{
                    //获取首页的商品推荐数据
                    bannerList.value = res.slides
                    recommendList.value = res.goods.data
                })
                //请求热销书数据
                getHomeGoods('sales').then(res=>{
                    goods.sales.list = res.goods.data
                })
                //请求推荐书数据
                getHomeGoods('recommend').then(res=>{
                    goods.recommend.list = res.goods.data
                })
                //请求新品书数据
                getHomeGoods('new').then(res=>{
                    goods.new.list = res.goods.data
                })
                //创建betterScroll对象
                bscroll = new BScroll(document.querySelector('.wrapper'),{
                    probeType: 3, //0、1、2、3,3滑动以及滑动过后的滚动都会触发scroll事件
                    click: true,     //允许内容点击
                    pullUpLoad: true, //默认是false，上拉加载
                });
                bscroll.on('scroll',(position)=>{
                    console.log('触发滚动事件');
                    //判断当前窗口定位，使backtop显示出来
                    isBackTopShow.value = isTabFixed.value = (-position.y) > document.querySelector('.my-swipe').clientHeight + document.querySelector('.recommend').clientHeight
                });
                //上拉事件请求服务器数据，将内容添加到数据模型，重新计算高度摆放内容
                bscroll.on('pullingUp',()=>{
                    console.log('触发上拉事件')
                    const page = goods[currentType.value].page+1;
                    getHomeGoods(currentType.value,page).then(res=>{
                        goods[currentType.value].list.push(...res.goods.data)
                        goods[currentType.value].page += 1;
                        bscroll.finishPullUp();
                    })
                    //重新计算高度
                    bscroll.refresh();
                })
                
            })
            // 监听数据变化，当有数据变化，让dom树渲染完成后重新计算高度
            watchEffect(()=>{
                nextTick(()=>{
                    bscroll && bscroll.refresh()
                });
            });
            //点击回到顶部
            const backTop = ()=>{
                bscroll.scrollTo(0,0,500)
            }
            return {
                bannerList,
                onMounted,
                recommendList,
                tabClick,
                goods,
                currentType,
                showGoods,
                bscroll,
                isTabFixed,
                isBackTopShow,
                backTop,
                tabCurrentIndex
            }
        },
        components: {
            topNav,
            recommend,
            tabControl,
            goodsList,
            backTop,
            homeBanner
        }
    }
</script>
<style lang="scss">
.home {
    height: 100vh;
    position: relative;
}
    .wrapper {
        position: absolute;
        top:45px;
        bottom: 50px;
        left: 0;
        right: 0;
        overflow: hidden;
    }
</style>