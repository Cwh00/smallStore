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
    import { Toast } from 'vant';
    import BScroll from 'better-scroll';
    import topNav from 'components/content/topNav';
    import { getGoods,getCurrentGoods } from 'network/category';
    import { ref,onMounted,reactive,computed,nextTick } from 'vue';
    export default {
        name: 'Category',
        setup() {
            //初始化 排序选项卡索引、排序选项卡默认当前类型、分类商品列表、当前属分类id、商品数据模型、分类点击索引、分类子选项点击索引
            let tabActive = ref(0);
            let tabCurrentType = ref('sales');
            let categories = ref([]);
            //商品所属分类id，默认0为所有商品
            let current_id = ref(0);
            const goodsList = reactive({
                sales:{page:1,list:[]},
                price:{page:1,list:[]},
                comments_count:{page:1,list:[]}
            })
            let activeName = ref('0');
            let sidebarActive = ref(0)
            //初始化得到排序商品、参数当前选项卡类型、商品所属分类id，初始值：sales排序的所有商品
            const init =  ()=>{
                return getCurrentGoods(tabCurrentType.value,current_id.value).then(res=>{
                    goodsList[tabCurrentType.value].list = res.goods.data 
                })
            }
            //初始化bscroll
            let bscroll = reactive({});
            //实例挂载完成之后,获取所有分类列表、初始化排序商品、
            onMounted(()=>{
                Toast.loading({message: '正在加载'});
                getGoods().then(res=>{
                    categories.value = res.categories
                });
                Toast.clear();
                init();
                bscroll = new BScroll(document.querySelector('.goods'),{
                    probeType: 3, //0、1、2、3,3滑动以及滑动过后的滚动都会触发scroll事件
                    click: true,     //允许内容点击
                    pullUpLoad: true, //默认是false，上拉加载
                });
                //滚动事件
                bscroll.on('scroll',(position)=>{
                    //判断当前窗口定位，使backtop显示出来
                    isBackTopShow.value = (-position.y) > 400
                });
                //上拉加载事件
                bscroll.on('pullingUp',()=>{
                    //数据模型默认第一页，让加载从第二页开始，得到的数据结构赋值到数据模型list数组中，然后让分页加1
                    let page = goodsList[tabCurrentType.value].page + 1;
                    getCurrentGoods(tabCurrentType.value,current_id.value,page).then(res=>{
                        console.log(res.goods.data)
                        goodsList[tabCurrentType.value].list.push(...res.goods.data)
                        goodsList[tabCurrentType.value].page += 1
                        //每次获取完一页数据后，结束本次上拉加载
                        bscroll.finishPullUp();
                    }).catch(err=>{
                        console.log(err);
                    });
                    //重新计算高度
                    bscroll.refresh();
                })
            }) 
            //点击选项卡，通过索引修改选项卡当前类型
            const tabClick = (index)=>{
                let tabTypes = ['sales','price','comments_count']
                tabCurrentType.value = tabTypes[index]
                //请求当前选项卡数据
                init();
                //页面渲染完之后重新计算高度
                nextTick(()=>{
                    bscroll && bscroll.refresh()
                });
            }
            //点击分类，通过传入的分类id修改当前分类id
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
        margin-top: var(--subcontent-margin-top);
        margin-bottom: var(--content-margin-bottom);
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
    // .back-top {
    //     position: fixed;
    // }
}
</style>