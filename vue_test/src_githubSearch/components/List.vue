<template>
  <div style="margin-left: 15px; width: 100%">
    <!-- 展示用户列表 -->
    <div
      v-show="users.length"
      class="item"
      v-for="user of users"
      :key="user.id"
    >
      <div>
        <a :href="user.html_url" target="_blank">
          <img :src="user.avatar_url" style="width: 100px" />
        </a>
      </div>
      <div class="card-text">{{ user.login }}</div>
    </div>
    <!-- 展示欢迎词 -->
    <div v-show="info.isFirst" style="font-size: 50px">欢迎查询!</div>
    <!-- 展示加载中 -->
    <div v-show="info.isLoading" style="font-size: 50px">加载中....</div>
    <!-- 展示错误信息 -->
    <div v-show="info.errMsg" style="font-size: 50px">
      发生错误！{{ info.errMsg }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      info: {
        isFirst: true,
        isLoading: false,
        errMsg: "",
      },
    };
  },
  mounted() {
    this.$bus.$on("getUsers", (users) => {
      this.users = users;
    });
    this.$bus.$on("getOtherMsg", (msgObj) => {
      this.info = { ...this.info, ...msgObj };
    });
  },
};
</script>

<style scoped>
.item {
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding: 10px;
  margin: 0 auto;
}
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>