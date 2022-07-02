<template>
    <div>
        <h1>我是微应用vue  About页</h1>
        <div @click="goHome">回Home</div>
    </div>
    
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

export default {
    name: "Home",
    props: {
    },
    setup() {

        const router = useRouter()

        const goHome = () => {
            router.push('/')
        }

        return {
            goHome
        }
    },
};
</script>

<style lang="less" scoped>

</style>
