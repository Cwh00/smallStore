<template>
    <div class="category">
        <top-nav>
            <template v-slot:default>商品分类</template>
        </top-nav>
        <div class="tabOrder">
            <van-tabs v-model="tabActive" @click="tabClick">
                <van-tab title="销量排序"></van-tab>
                <van-tab title="价格排序"></van-tab>
                <van-tab title="评论排序"></van-tab>
            </van-tabs>
        </div>
        <div class="content">
            <van-sidebar class="leftNav" v-model="sidebarActive">
                <van-collapse v-model="activeName" accordion> 
                    <van-collapse-item v-for="item in categories" :key="item.id"
                    :title="item.name" :name="item.name">                        
                        <van-sidebar-item v-for="sub in item.children"
                        :key="sub.id"
                        :title="sub.name"
                        @click="getCategory_id(sub.id)"/>                        
                        </van-collapse-item>
                </van-collapse>
            </van-sidebar>
            <div class="goods">
                <div class="goods-content">
                    <van-card  v-for="item in showGoods" :key="item.id"
                        :num="item.comments_count"
                        :tag="item.conments_count >0 ? '流行' : '推荐'"
                        :price="item.price"
                        :desc="item.updated_at"
                        :title="item.title"
                        :thumb="item.cover_url"
                        :lazy-load="true"
                        @click="goDetail(item.id,item.title)"
                        />
                </div>    
            </div>                     
        </div>
        <back-top v-show="isBackTopShow" @backTop="backTop"></back-top>     
    </div>
</template>
<script>
    import backTop from 'components/common/backTop';
    import { useRouter } from 'vue-router';
    import BScroll from 'better-scroll';
    import topNav from 'components/content/topNav';
    import { getGoods,getCurrentGoods } from 'network/category';
    import { ref,onMounted,reactive,computed,nextTick } from 'vue';
    export default {
        name: 'Category',
        setup() {
            let tabActive = ref(0);
            let tabCurrentType = ref('sales');
            let categories = ref([]);
            let current_id = ref(0);
            const goodsList = reactive({
                sales:{page:1,list:[]},
                price:{page:1,list:[]},
                comments_count:{page:1,list:[]}
            })
            let activeName = ref('0');
            let sidebarActive = ref(0)
            const init =  ()=>{
                return getCurrentGoods(tabCurrentType.value,current_id.value).then(res=>{
                    goodsList[tabCurrentType.value].list = res.goods.data 
                })
            }
            //初始化bscroll
            let bscroll = reactive({});

            onMounted(()=>{
                getGoods().then(res=>{
                    categories.value = res.categories
                });
                init();
                bscroll = new BScroll(document.querySelector('.goods'),{
                    probeType: 3, //0、1、2、3,3滑动以及滑动过后的滚动都会触发scroll事件
                    click: true,     //允许内容点击
                    pullUpLoad: true, //默认是false，上拉加载
                });
                bscroll.on('scroll',(position)=>{
                    //判断当前窗口定位，使backtop显示出来
                    isBackTopShow.value = (-position.y) > 400
                });
                bscroll.on('pullingUp',()=>{
                    let page = goodsList[tabCurrentType.value].page + 1;
                    getCurrentGoods(tabCurrentType.value,current_id.value,page).then(res=>{
                        goodsList[tabCurrentType.value].list.push(...res.goods.data)
                        goodsList[tabCurrentType.value].page += 1
                        bscroll.finishPullUp();
                    }).catch(err=>{
                        console.log(err);
                    });
                    //重新计算高度
                    bscroll.refresh();
                })
            }) 
            const tabClick = (index)=>{
                let tabTypes = ['sales','price','comments_count']
                tabCurrentType.value = tabTypes[index]
                init();
                nextTick(()=>{
                    bscroll && bscroll.refresh()
                });
            }
            const getCategory_id = (Category_id)=>{
                current_id.value = Category_id
                init();
                nextTick(()=>{
                    bscroll && bscroll.refresh()
                });
            }
            const router = useRouter();
            const goDetail = (id,title)=>{
                router.push({path:'/Detail',query:{id,title}})
            }
            const showGoods = computed(()=>{
                return goodsList[tabCurrentType.value].list
            });
            //返回顶部区域
            let isBackTopShow = ref(false);
            
            const backTop = ()=>{
                bscroll.scrollTo(0,0,500)
            }
            return {
                tabActive,
                activeName,
                sidebarActive,
                categories,
                tabClick,
                tabCurrentType,
                getCategory_id,
                showGoods,
                init,
                goDetail,
                backTop,
                isBackTopShow
            }
        },
        components: {
            topNav,
            backTop
        }
    }
</script>
<style lang="scss">
.category {
    .tabOrder {
        width: 100%;
        display:flex;
        justify-content: flex-end;
        padding: 5px 10px;
        position: fixed;
        top: 45px;
        left: 0;
        z-index: 9;
        background: #fff;
        box-shadow: 0px 1px 5px rgb(214, 214, 214);
            .van-tab {
                padding: 0px 10px;
            }
    }
    .content {
        width: 100%;
        margin-top: 100px;
        margin-bottom: 50px;
        .leftNav {
            width: 30%;
        }
        .goods {
            width: 70%;
            position: fixed;
            top: 100px;
            right: 0;
            bottom: 50px;
        }
    }
    .goods-content .van-card .van-card__title {
        text-align: left;
        margin: 5px 0px;
    }
}
</style>