<template>
  <div>
    <ul>
      <!-- 化简 -->
      <!-- <li>消息编号：{{ $route.query.id }}</li>
      <li>消息标题：{{ $route.query.title }}</li> -->
      <li>消息标题：{{ title }}</li>
      <li>消息编号：{{ id }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MsgDetail",
  props: ["id", "title"],
  mounted() {
    console.log(this.$route);
  },
};
</script>

<style>
</style>