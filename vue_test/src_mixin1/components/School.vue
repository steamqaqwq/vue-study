<template>
  <div>
      <h2>学校名：{{name}}</h2>
  </div>
</template>

<script>
import {mixin} from '../mixin'
export default {
    data() {
        return {
            msg:'sdfdf',
            name:'清华'
        }
    },
    mixins:[mixin]

}
</script>

<style>

</style>