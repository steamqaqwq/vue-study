<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <MyHeader @getTodo="getTodo" />
      <MyContain
        :todoList="todoList"
        :handlerCheck="handlerCheck"
        :delTodo="delTodo"
      />
      <MyFooter
        :doneMsg="dones"
        @delAllTodos="delAllTodos"
        @checkAllTodos="checkAllTodos"
      />
    </div>
  </div>
</template>

<script>
import MyContain from "@/components/MyContain";
import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
console.log();
// 引入nanoid
// import { nanoid } from "nanoid";
export default {
  name: "App",
  components: {
    MyContain,
    MyFooter,
    MyHeader,
  },
  data() {
    return {
      // todoList: [
      //   { id: nanoid(), name: "吃饭", checked: false },
      //   { id: nanoid(), name: "学习", checked: true },
      //   { id: nanoid(), name: "睡觉", checked: false },
      // ],
      // 使用游览器存储todoList 并采用JSON格式   空列表可以有长度
      todoList: JSON.parse(localStorage.getItem("todoList")) || [],
    };
  },
  computed: {
    dones() {
      let dones = this.todoList.reduce((pre, cur) => {
        return pre + (cur.checked ? 1 : 0);
      }, 0);
      return {
        listLen: this.todoList.length,
        dones,
      };
    },
  },
  methods: {
    getTodo(obj) {
      this.todoList.unshift(obj);
    },
    handlerCheck(id) {
      this.todoList.forEach((todo) => {
        if (todo.id == id) {
          todo.checked = !todo.checked;
        }
      });
    },
    delTodo(id) {
      this.todoList.forEach((todo, index) => {
        if (todo.id == id) {
          this.todoList.splice(index, 1);
        }
      });
      // 还可以使用过滤实现
      // this.todoList = this.todoList.filter((todo) => todo.id != id);
    },
    checkAllTodos(checked) {
      this.todoList.forEach((item) => {
        item.checked = checked;
      });
    },
    delAllTodos() {
      this.todoList = this.todoList.filter((todo) => !todo.checked);
    },
  },
  watch: {
    todoList: {
      handler(value) {
        // 使用游览器存储todoList
        localStorage.setItem("todoList", JSON.stringify(value));
      },
      deep: true,
    },
  },
  mounted() {
    this.$bus.$on("handlerCheck", this.handlerCheck);
    this.$bus.$on("delTodo", this.delTodo);
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