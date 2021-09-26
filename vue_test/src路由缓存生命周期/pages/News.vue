<template>
  <ul>
    <li v-for="news in newsList" :key="news.id">
      <!-- param传参 -->
      <router-link
        :to="{
          name: 'xinwen',
          params: {
            id: news.id,
            title: news.title,
          },
        }"
        >{{ news.title }}
      </router-link>
      <button @click="go(news)">push查看</button>
      <button @click="back(news)">replace查看</button>
    </li>
    <router-view></router-view>
  </ul>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      newsList: [
        { id: "001", title: "新闻一" },
        { id: "002", title: "新闻二" },
        { id: "003", title: "新闻三" },
      ],
    };
  },
  methods: {
    go(news) {
      this.$router.push({
        name: "xinwen",
        params: {
          id: news.id,
          title: news.title,
        },
      });
    },
    back(news) {
      this.$router.replace({
        name: "xinwen",
        params: {
          id: news.id,
          title: news.title,
        },
      });
    },
  },
 
};
</script>

<style>
</style>