<template>
  <div>
      <h2>学生名：{{name}} 年龄：{{age}}</h2>
  </div>
</template>

<script>
import {mixin} from '../mixin'

export default {
    data() {
        return {
            msg:'sdfdf'
        }
    },
    mixins:[mixin]

    ,
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