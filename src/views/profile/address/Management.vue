<template>
    <div class="Management">
        <top-nav>
            <template v-slot:default>管理地址</template>
        </top-nav>
        <div class="content">
            <div class="listNull" style="margin-top:300px" v-show="list.length == 0">还没有添加地址</div>
            <van-address-list
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            />
        </div>
    </div>
</template>
<script>
    import { useRouter } from 'vue-router';
    import { addAddress, deleteAddress, getAddressList } from 'network/address';
    import topNav from 'components/content/topNav';
    import { ref,reactive, onMounted, toRefs } from 'vue';
    export default {
        name: 'Management',
        components: {
            topNav,
        },
        setup() {
            const router = useRouter();
            const state = reactive({
                chosenAddressId: 1,
                list: []
            })
            const onAdd = ()=>{
                router.push({path: '/editAddress',query:{type:'add'}});
            }
            const onEdit = (item)=>{
                router.push({path: '/editAddress',query:{type: 'edit', id: item.id}})
            }
            onMounted(()=>{
                getAddressList().then(res=>{
                    state.list = res.data.map(item => {
                        // console.log(item.is_default)
                        return {
                            id: item.id,
                            name: item.name,
                            tel: item.phone,
                            address: `${item.province} ${item.city} ${item.county} ${item.address}`,
                            isDefault: item.is_default
                        }
                    });
                });
            })
            return {
                ...toRefs(state),
                onAdd,
                onEdit
            }
        }
    }
</script>
<style lang="scss">
.Management {
    .content {
        margin-top: var(--content-margin-top);
        .van-address-list {
            
            .van-address-list__bottom {
                bottom: 50px;
            }
        }
    }
}
</style>