<template>
    <div class="Edit">
        <top-nav>
            <template v-slot:default>{{title}}</template>
        </top-nav>
        <div class="content">
            <van-address-edit
            :address-info="info"
            :area-list="areaList"
            :show-delete="type == 'edit'"
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
            />
        </div>
    </div>
</template>
<script>
    import { useRouter,useRoute
     } from 'vue-router';
    import areaList from 'utils/area.js'
    import topNav from 'components/content/topNav';
    import { reactive, onMounted, toRefs, computed } from 'vue';
    import { Toast } from 'vant';
    import { addAddress, addressDetail, deleteAddress, updateAddress } from 'network/address';
    export default {
        name: 'EditAddress',
        components: {
            topNav,
        },
        setup() {
            const router = useRouter();
            const route = useRoute();
            const state = reactive({
                info: {},
                searchResult: [],
                type: '',
                id: '',
                title: '',
            });
            const title = computed(()=>{
                if(state.type == 'edit'){
                    return '編輯地址';
                }else{
                    return '新增地址';
                }
            });
            const onSave = (content) => {
                console.log(content)
                const params = {
                    name: content.name,
                    address: content.addressDetail,
                    phone: content.tel,
                    province: content.province,
                    city: content.city,
                    county: content.county,
                    is_default: content.isDefault? 1 : 0
                }
                if(state.type == 'add'){
                    addAddress(params)
                }else if(state.type == 'edit'){
                    updateAddress(state.id,params)
                }
                Toast.success('保存成功');
                setTimeout(()=>{
                    router.back();
                },500)
            }
                
            const onDelete = () => {
                deleteAddress(state.id).then(res=>{
                    if(res.status == 204){
                        Toast.success('刪除成功');
                        setTimeout(()=>{
                            router.back();
                        },500)
                    }

                })
            };
            const onChangeDetail = (val) => {
                if (val) {
                    state.searchResult = [
                        {
                            name: '黄龙万科中心',
                            address: '杭州市西湖区',
                        },
                    ];
                } else {
                    state.searchResult = [];
                }
            };
            onMounted(() => {
                const {type,id} = route.query
                state.type = type
                state.id = id
                
                if(type == 'edit'){
                    addressDetail(id).then(res=>{
                        console.log(res);
                        let content = res
                        let areaCode = ''
                        //取出区列表的所有键和值然后遍历
                        Object.entries(areaList.county_list).forEach(([county_code,county_text])=>{
                            //判断请求到的区等于遍历的当前区
                            if(content.county == county_text){
                                //过滤出和当前区地区码前俩位一致的省份
                                const provinceItem = Object.entries(areaList.province_list).filter(([province_code,province_text])=>{
                                    return province_code.substr(0,2) == county_code.substr(0,2);
                                })
                                //过滤出和当前区地区码前四位一致的城市
                                const cityItem = Object.entries(areaList.city_list).filter(([city_code,city_text])=>{
                                    return city_code.substr(0,4) == county_code.substr(0,4)
                                })
                                //最后判断请求到的省，城是否一致，避免区重名
                                if(provinceItem[0][1] == content.province && cityItem[0][1] == content.city){
                                    areaCode = county_code
                                }
                            }
                        })

                        state.info = {
                            name: content.name,
                            addressDetail: content.address,
                            tel: content.phone,
                            areaCode:areaCode,
                            province: content.province,
                            city: content.city,
                            county: content.county,
                            isDefault: !!content.is_default
                        }
                    });
                }
            })
            
            return {
                onSave,
                onDelete,
                areaList,
                ...toRefs(state),
                onChangeDetail,
                title
            };
        }
    }
</script>
<style lang="scss">
    .Edit {

        .content {
            margin-top: var(--content-margin-top);
        }
    }
</style>