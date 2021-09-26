<template>
  <div class="box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
    };
  },
  props: [],
};
</script>

<style scoped>
.box {
  border: 1px red solid;
  height: 300px;
  width: 200px;
  background-color: rgba(233, 241, 227, 0.62);
  margin: 10px;
  display: flex;
  float: left;
  flex-direction: column;
}
video {
  width: 100%;
}
</style>