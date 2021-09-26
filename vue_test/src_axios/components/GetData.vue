<template>
  <div>
    <button @click="getCarsData">点我获取数据</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cars: "",
    };
  },
  methods: {
    getCarsData() {
      axios
        .get("http://xu.study/36xujh/public/index.php/xujh_forum/getCars")
        .then(
          (resolve) => {
            console.log(resolve);
          },
          (reject) => {
            console.log(reject);
          }
        );
    },
  },
};
</script>

<style>
</style>