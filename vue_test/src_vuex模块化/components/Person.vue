<template>
  <div>
    <hr style="color: #000" />
    <hr />
    <hr />
    <h2>人员列表</h2>
    <h3>Count组件求和为：{{ sum }}</h3>
    <button @click="shuosaohua">说句骚话</button>
    <input type="text" placeholder="请输入姓名" v-model="name" />
    <button @click="addName">添加</button>
    <div>{{ saohua }}</div>
    <div>{{ reverseSaohua }}</div>
    <ul>
      <li v-for="person in personList" :key="person.id">{{ person.name }}</li>
    </ul>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
// import { mapState } from "vuex";
export default {
  name: "Person",
  data() {
    return {
      name: "",
    };
  },
  computed: {
    // ...mapState(["personList", "sum"]),
    personList() {
      return this.$store.state.personAbout.personList;
    },
    sum() {
      return this.$store.state.countAbout.sum;
    },
    saohua() {
      return this.$store.state.personAbout.saohua;
    },
    reverseSaohua() {
      return this.$store.getters["personAbout/reverseSaohua"];
    },
  },
  methods: {
    addName() {
      const obj = { name: this.name, id: nanoid() };
      this.$store.commit("personAbout/ADDPERSON", obj);
      this.name = "";
    },
    shuosaohua() {
      this.$store.dispatch("personAbout/shuosaohua");
    },
  },
};
</script>

<style>
</style>