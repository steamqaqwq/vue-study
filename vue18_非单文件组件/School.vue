
<template>
    <div>
        <h2 class="color">我的大学：{{name}}</h2>
        <student></student>
    </div>
</template>

<script>
export default {
    name:"School", //定义别名
    components:{
        Student
    },
    data(){
        return {
            name:'清华大学'
        }
    }
}
</script>

<style>
    .color{
        font-size: 20px;
        color:bisque
    }
</style>