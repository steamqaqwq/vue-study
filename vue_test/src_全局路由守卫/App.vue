<template>
  <div style="margin-left: 100px">
    <div>
      <h2>Vue Router Demo</h2>
      <button @click="$router.forward()">前进</button>
      <button @click="$router.back()">后退</button>
      <button @click="$router.go(2)">测试router.go</button>
    </div>
    <div class="box">
      <nav>
        <ul>
          <li>
            <router-link active-class="active" to="/home">Home</router-link>
          </li>
          <li>
            <router-link active-class="active" to="/school">School</router-link>
          </li>
        </ul>
      </nav>
      <div class="context">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {},
};
</script>

<style >
* {
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
}
title {
  font-size: 30px;
  font-weight: 700;
}
nav {
  width: 100px;
  height: 100px;
  float: left;
  border: 1px solid rgb(150, 66, 66);
}
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
nav li {
  width: 100%;
  height: 50%;
  list-style-type: none;
  text-align: center;
}
nav li a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

nav li:nth-child(1) a {
  background-color: rgba(65, 94, 181, 0.207);
}
nav li:nth-child(2) a {
  background-color: rgba(186, 195, 52, 0.207);
}
.context {
  float: left;
  /* font-size: 30px; */
  margin-left: 10px;
}
.box {
  float: left;
  overflow: hidden;
  border: 1px solid rgb(22, 125, 96);
  padding: 10px;
  margin-top: 10px;
}
.active {
  background-color: rgb(205, 60, 60) !important;
}
</style>