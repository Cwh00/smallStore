<template>
    <div class="about">
        <top-nav>
            <template v-slot:default>关于我们</template>
        </top-nav>
    </div>
</template>
<script>
    import topNav from 'components/content/topNav';
    export default {
        name: 'About',
        components: {
            topNav,
        }
    }
</script>
<style lang="scss">

</style>