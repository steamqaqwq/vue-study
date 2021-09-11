<template>
    <div class="outdiv">
        <Student name="张三" :age="18"/>
        <Student name="李四" :age="18+2"/>
        <Student name="王五" />
        <School />
    </div>
</template>

<script>
import Student from './components/Student'
import School from './components/School'

export default {
    name:'App',
    components:{
        Student,
        School
    }
}
</script>

<style>
    .outdiv{
        border:1px solid red
    }
</style>