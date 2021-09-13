
<template>
  <div>
    <h2 class="color">我的大学：{{ name }}</h2>
    <button @click="sendSonMsg">点击给APP传值</button>
    <!-- <student></student> -->
  </div>
</template>

<script>
// import Student from './Student.vue'
export default {
  name: "School", //定义别名
  components: {
    // Student
  },
  data() {
    return {
      name: "清华大学",
    };
  },
  // props: ["getSonMsg"],
  methods: {
    sendSonMsg() {
      this.$emit("getSonMsg", this.name);
    },
  },
};
</script>

<style>
.color {
  font-size: 20px;
  color: bisque;
}
</style>