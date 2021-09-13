
<template>
  <div>
    <h2 class="color">我的大学：{{ name }}</h2>
    <!-- <button @click="">点我接受Student信 息</button> -->
  </div>
</template>

<script>
export default {
  name: "School", //定义别名
  components: {},
  data() {
    return {
      name: "清华大学",
    };
  },
  methods: {},
  mounted() {
    this.$bus.$on("getStudent", (data) => {
      console.log("我是School接收到Student组件", data);
    });
  },
};
</script>

<style>
.color {
  font-size: 20px;
  color: bisque;
}
</style>