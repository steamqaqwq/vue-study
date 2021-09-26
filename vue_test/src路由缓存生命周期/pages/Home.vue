<template>
  <div>
    <div><h2>这是Home页面</h2></div>
    <div class="box">
      <nav>
        <ul class="ul">
          <li>
            <router-link active-class="active" to="/home/news"
              >News</router-link
            >
          </li>
          <li>
            <router-link active-class="active" to="/home/message"
              >Message</router-link
            >
          </li>
        </ul>
      </nav>
      <div class="context">
        <keep-alive include="Message">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
}
* {
  margin: 0;
}
nav {
  width: 200px;
  height: auto;
}
.ul {
  flex-direction: row;
}
</style>