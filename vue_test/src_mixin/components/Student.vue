<template>
  <div>
      <h2>学生名：{{name}} 年龄：{{age}}</h2>
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg:'sdfdf'
        }
    },
    // props:['name','age'],
    props:{
        name:{
            type:String,
            require:true
        },
        age:{
            type:Number,
            default:22
        }
    }
}
</script>

<style>

</style>