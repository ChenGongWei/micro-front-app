<template>
    <div>
        <h1>我是微应用vue  Home页</h1>
        <div @click="goMain">回主应用首页</div>
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

        const goMain = () => {
            console.log(13)
            router.push('/about')
        }

        return {
            goMain
        }
    },
};
</script>

<style lang="less" scoped>

</style>
