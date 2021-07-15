<template>
    <div class="tab">
        <div class="tab-item" 
        v-for="(item,index) in tabTitles" 
        :key="index"
        @click="itemClick(index)"
        :class="{active:index==currentIndex}">
            <span>{{item}}</span>
        </div>
    </div>
</template>
<script>
    import { ref } from 'vue';
    export default {
        name: 'tabControl',
        props: {
            tabTitles: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        setup(props,{emit}) {
            let currentIndex = ref(0);
            const itemClick = (index)=>{
                currentIndex.value = index
                emit('tabClick',index)
            }   
            return {
                itemClick,
                currentIndex
            }
        }
    }
</script>
<style scoped lang="scss">
    .tab {
        width: 100%;
        background:var(--color-background);
        display: flex;
        padding: 10px;
        position: sticky;
        top: 45px;
        z-index: 5;
        .tab-item {
            flex: 1;
            span {
                padding-bottom: 6px;
            }
        }
        .active span {
            border-bottom: 2px solid var(--color-tint);
        }
    }
</style>