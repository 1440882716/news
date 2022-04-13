<template>
  <div id="app" style="min-height: height;">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    height: "";
  },
  created() {
    window.screenHeight = document.body.clientHeight;
    this.height = window.screenHeight;
    // console.log(document.body.clientHeight);
    // debugger;
  }
};
</script>

<style>
body {
  margin: 0px;
  min-height: 100%;
  /* min-height: 900px; */
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
