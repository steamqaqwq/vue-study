<template>
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      @keyup.enter="addData"
      v-model="title"
    />
  </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  name: "MyHeader",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    addData(e) {
      // 校验输入的数据
      if (!this.title.trim()) {
        alert("输入不能为空");
        return;
      }
      const objData = { id: nanoid(), name: e.target.value, checked: false };
      this.$emit("getTodo", objData);
      // 清空input输入的数据
      this.title = "";
    },
  },
  props: [],
};
</script>

<style scoped>
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}

/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>