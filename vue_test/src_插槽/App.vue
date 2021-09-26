<template>
  <div>
    <Category>
      <title>游戏</title>
      <ul>
        <li v-for="(game, index) in games" :key="index">{{ game }}</li>
      </ul>
      <img src="../public/img/1.jpg" alt="游戏" />
    </Category>
    <Category>
      <title>美食</title>
      <ul>
        <li v-for="(food, index) in foods" :key="index">{{ food }}</li>
      </ul>
      <img src="../public/img/2.jpg" alt="美食" />
    </Category>
    <Category>
      <title>电影</title>
      <ul>
        <li v-for="(film, index) in films" :key="index">{{ film }}</li>
      </ul>
      <video src="../public/video/mov_bbb.mp4" controls></video>
    </Category>
  </div>
</template>

<script>
import Category from "@/components/Category.vue";
export default {
  name: "App",
  components: {
    Category,
  },
  data() {
    return {
      games: ["红警", "魔兽", "CSGO"],
      foods: ["火锅", "烧烤", "滑蛋"],
      films: ["《heaven feel》", "电影二", "电影三", "月光宝盒"],
    };
  },
};
</script>

<style>
title {
  display: block;
  margin: 0 auto;
}
img {
  width: 100%;
}
</style>