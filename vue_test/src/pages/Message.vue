<template>
  <div>
    <ul>
      <li v-for="msg in mesList" :key="msg.id">
        <router-link
          :to="{
            path: '/home/message/msgdetail',
            query: {
              id: msg.id,
              title: msg.title,
            },
          }"
          >{{ msg.title }}
        </router-link>
        <!-- <router-link to="/home/message/msgdetail">{{ msg.title }}</router-link> -->
        <input type="text" />
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      mesList: [
        { id: "001", title: "消息一" },
        { id: "002", title: "消息二" },
        { id: "003", title: "消息三" },
      ],
    };
  },
  // 激活的生命周期钩子
  activated() {
    console.log("组件激活了");
    this.timer = setInterval(() => {
      console.log("#");
    }, 100);
  },
  deactivated() {
    console.log("组件失活了");
    clearInterval(this.timer);
  },
};
</script>

<style>
</style>