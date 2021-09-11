<template>
    <div>
        <h2 ref="h2">学校名:{{name}}</h2>
    <!-- <span v-text="getH2"></span> -->
        <button @click="getH2">点击控制台输出h2</button>

    </div>
</template>

<script>
export default {
    data() {
        return {
            name:'清华'
        }
    },
    methods:{
        getH2(){
            console.log(this.$refs)
            return this.$refs.h2
        }
    }
}
</script>

<style>
    
</style>