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
    ...mapState({ he: "sum", personList: "personList" }),
    ...mapGetters(["tensum"]),
  },
  methods: {
    // add() {
    //   // this.sum += this.num;
    //   this.$store.commit("ADD", this.num);
    // },
    // decrease() {
    //   // this.sum -= this.num;
    //   this.$store.commit("JIAN", this.num);
    // },

    //1.mapMutations生成对应方法,方法会调用commit联系Mutations(对象写法)
    ...mapMutations({
      add: "ADD",
      decrease: "JIAN",
    }),
    // 2.方法需和commmit一致
    // ...mapMutations([
    //   "ADD",
    //   "JIAN"
    // ])
    /**************优化************************************* */

    // addOdd() {
    //   // if (this.sum % 2 != 0) this.sum += this.num;
    //   this.$store.dispatch("addOdd", this.num);
    // },
    // addWait() {
    //   this.$store.dispatch("addWait", this.num);
    // },
    // 借助mapActions生成的方法,方法中会调用dispatch联系 Actions
    ...mapActions({
      addOdd: "addOdd",
      addWait: "addWait",
    }),
  },
  mounted() {
    // console.log(this);
  },
};
</script>

<style>
</style>