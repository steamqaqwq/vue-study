<template>
  <div class="todo-footer" v-show="this.doneMsg.listLen">
    <label>
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{ doneMsg.dones }}</span> / 全部{{ doneMsg.listLen }}</span
    >
    <button class="btn btn-danger" @click="delAllTodos()">
      清除已完成任务
    </button>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["doneMsg", "delAllTodos", "checkAllTodos"],
  computed: {
    // isAll() {
    //   return (
    //     this.doneMsg.dones == this.doneMsg.listLen && this.doneMsg.listLen > 0
    //   );
    // },
    isAll: {
      get() {
        return (
          this.doneMsg.dones == this.doneMsg.listLen && this.doneMsg.listLen > 0
        );
      },
      set(value) {
        this.checkAllTodos(value);
      },
    },
  },
};
</script>

<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>