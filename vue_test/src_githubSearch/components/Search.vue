<template>
  <section style="padding-left: 20px" class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input
        type="text"
        placeholder="enter the name you search"
        v-model="keyWord"
      />&nbsp;
      <button @click="searchUsers">Search</button>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      keyWord: "",
      users: [],
    };
  },
  methods: {
    searchUsers() {
      this.$bus.$emit("getOtherMsg", {
        isFirst: false,
        isLoading: true,
        errMsg: "",
      });
      axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
        (success) => {
          this.users = success.data.items;
          this.$bus.$emit("getUsers", this.users);
          this.$bus.$emit("getOtherMsg", {
            isLoading: false,
            errMsg: "",
          });
        },
        (error) => {
          this.$bus.$emit("getOtherMsg", {
            isLoading: false,
            errMsg: error.message,
          });
        }
      );
    },
  },
};
</script>

<style>
</style>