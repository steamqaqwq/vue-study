<template>
  <div>
    <h2>学生:{{ name }}</h2>
    <button @click="changeStudent">点击更换学生</button>
    <button @click="getStudent(name)">传统子传父</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "张三",
    };
  },
  props: ["getStudent"],
  methods: {
    changeStudent() {
      this.name == "张三" ? (this.name = "李四") : (this.name = "张三");
    },
  },
};
</script>

<style>
</style>