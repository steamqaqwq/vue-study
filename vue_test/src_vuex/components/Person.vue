<template>
  <div>
    <hr style="color: #000" />
    <hr />
    <hr />
    <h2>人员列表</h2>
    <h3>Count组件求和为：{{ sum }}</h3>
    <input type="text" placeholder="请输入姓名" v-model="name" />
    <button @click="addName">添加</button>
    <ul>
      <li v-for="person in personList" :key="person.id">{{ person.name }}</li>
    </ul>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import { mapState } from "vuex";
export default {
  name: "Person",
  data() {
    return {
      name: "",
    };
  },
  computed: {
    ...mapState(["personList", "sum"]),
  },
  methods: {
    addName() {
      const obj = { name: this.name, id: nanoid() };
      this.$store.commit("ADDPERSON", obj);
      this.name = "";
    },
    // ...mapMutations({ addname: "ADDPERSON" }),
  },
};
</script>

<style>
</style>