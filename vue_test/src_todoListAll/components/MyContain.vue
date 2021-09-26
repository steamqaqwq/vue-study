<template>
  <ul class="todo-main">
    <transition-group name="todo" appear>
      <MyItem v-for="todo in todoList" :key="todo.id" :todo="todo" />
    </transition-group>
  </ul>
</template>

<script>
import MyItem from "@/components/MyItem";

export default {
  name: "MyContain",
  components: { MyItem },
  props: ["todoList"],
};
</script>

<style >
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
.todo-enter-active {
  animation: a 0.5s linear;
}
.todo-leave-active {
  animation: a 0.5s linear;
}
@keyframes a {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0px);
  }
}
</style>