<template>
  <li>
    <label>
      <input
        type="checkbox"
        :checked="todo.checked"
        @change="handlerCheck(todo.id)"
      />
      <span>{{ todo.name }}</span>
    </label>
    <button class="btn btn-danger" @click="delHandler(todo.id)">删除</button>
  </li>
</template>

<script>
export default {
  name: "MyItem",
  methods: {
    delHandler(id) {
      if (confirm("确定删除吗")) {
        this.delTodo(id);
      }
    },
  },
  props: ["todo", "handlerCheck", "delTodo"],
};
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
li:hover {
  background-color: rgba(216, 178, 178, 0.786);
}
li:hover button {
  display: block;
}
</style>