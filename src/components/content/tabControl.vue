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
            },
            currentIndex: {
                type: Number,
                default() {
                    return 0;
                }
            }
        },
        setup(props,{emit}) {
            const itemClick = (index)=>{
                // props.currentIndex = index
                emit('tabClick',index)
            }   
            return {
                itemClick,
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