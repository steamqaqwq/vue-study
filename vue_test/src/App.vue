<template>
  <div>
    <School @getSonMsg="getSchoolName" />
    <Student :getStudent="getStudent" />
  </div>
</template>

<script>
import School from "@/components/School";
import Student from "@/components/Student";

export default {
  name: "App",
  components: {
    School,
    Student,
  },
  methods: {
    // $emit 自定义事件
    getSchoolName(name) {
      console.log("APP收到SonMsg", name);
    },
    getStudent(name) {
      console.log("App收到学生名", name);
    },
  },
};
</script>

<style>
</style>