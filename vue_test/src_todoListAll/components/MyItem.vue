<template>
  <li>
    <label>
      <input
        type="checkbox"
        :checked="todo.checked"
        @change="$bus.$emit('handlerCheck', todo.id)"
      />
      <span v-show="!todo.isEdit">{{ todo.name }}</span>
      <input
        type="text"
        v-show="todo.isEdit"
        :value="todo.name"
        @blur="blurHandler(todo, $event)"
        ref="inputTitle"
      />
    </label>
    <button class="btn btn-danger" @click="delHandler(todo.id)">删除</button>
    <button
      class="btn btn-edit"
      v-show="!todo.isEdit"
      @click="editHandler(todo)"
    >
      编辑
    </button>
  </li>
</template>

<script>
export default {
  name: "MyItem",
  methods: {
    delHandler(id) {
      if (confirm("确定删除吗")) {
        // this.delTodo(id);
        this.$bus.$emit("delTodo", id);
      }
    },
    editHandler(todo) {
      // todo.isEdit = true;//非响应式
      // 判断todo有无isEdit属性
      if (todo.hasOwnProperty) {
        //坑一todo.isEdit判断不行
        todo.isEdit = true;
      } else {
        this.$set(todo, "isEdit", true);
      }
      // setTimeout(() => {
      //   console.log(this.$refs.inputTitle);
      //   this.$refs.inputTitle.focus();
      // }, 200);
      // 点击编辑时聚焦input框;
      this.$nextTick(function () {
        console.log(111);
        this.$refs.inputTitle.focus();
      });
    },
    blurHandler(todo, e) {
      if (!e.target.value.trim()) return alert("不能为空");
      todo.isEdit = false;
      // 坑二 此时todo.value未更新不能传
      this.$bus.$emit("updateTodo", todo.id, e.target.value);
    },
  },
  props: ["todo"],
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