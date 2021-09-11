<template>
    <div class="outdiv">
        <School />
        <Student />
    </div>
</template>

<script>
import School from './components/School'
import Student from './components/Student'

export default {
    name:'App',
    components:{
        School,
        Student
    }
}
</script>

<style>
    .outdiv{
        border:1px solid red
    }
</style>