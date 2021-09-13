<template>
  <div>
    <h2>学生:{{ name }}</h2>
    <button @click="changeStudent">点击更换学生</button>
    <button @click="sendStudentMsg">点击发送学生信息</button>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name: "张三",
    };
  },
  methods: {
    changeStudent() {
      this.name == "张三" ? (this.name = "李四") : (this.name = "张三");
    },
    sendStudentMsg() {
      this.$bus.$emit("getStudent", 6666);
    },
  },
};
</script>

<style>
</style>