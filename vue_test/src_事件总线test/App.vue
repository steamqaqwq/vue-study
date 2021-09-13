<template>
  <div>
    <School />
    <Student />
  </div>
</template>

<script>
import Student from "@/components/Student";
import School from "@/components/School";

// 引入nanoid
// import { nanoid } from "nanoid";
export default {
  name: "App",
  components: {
    Student,
    School,
  },
  data() {
    return {
      // todoList: [
      //   { id: nanoid(), name: "吃饭", checked: false },
      //   { id: nanoid(), name: "学习", checked: true },
      //   { id: nanoid(), name: "睡觉", checked: false },
      // ],
      // 使用游览器存储todoList 并采用JSON格式   空列表可以有长度
    };
  },
};
</script>

<style>
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>