<template>
  <div>
    <h2>当前求和为：{{ he }}</h2>
    <!-- <h2>当前求和放大十倍为：{{ this.$store.getters.tensum }}</h2> -->
    <h2>当前求和放大十倍为：{{ tensum }}</h2>
    <select v-model.number="num">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <button @click="add(num)">+</button>
    <button @click="decrease(num)">-</button>
    <button @click="addOdd(num)">当前和为奇数再加</button>
    <button @click="addWait(num)">等一等再加</button>
    <h3>Person组件总人数是{{ personList.length }}</h3>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Count",
  data() {
    return {
      num: 1,
    };
  },
  computed: {
    // mapS.. 返回的是对象需要展开语法
    ...mapState("countAbout", { he: "sum" }),
    // 引入其他模块数据
    ...mapState("personAbout", { personList: "personList" }),

    ...mapGetters("countAbout", ["tensum"]),
  },
  methods: {
    ...mapMutations("countAbout", {
      add: "ADD",
      decrease: "JIAN",
    }),
    ...mapActions("countAbout", {
      addOdd: "addOdd",
      addWait: "addWait",
    }),
  },
};
</script>

<style>
</style>