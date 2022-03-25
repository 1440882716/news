<template>
  <div class="header">
    <div class="container gray-head-bgc">
      <div class="head-line">
        <div class="content-login font14  flex-r flex-b fff-font">
          <div class="head-line-left">
            <span>您好，欢迎来到报刊订阅平台</span>
            <router-link to="/" style="text-decoration: none;">
              <span class="m-l-20">返回首页</span>
              <span>|</span>
            </router-link>
            <router-link to="./help" style="text-decoration: none;color: white;"
              >帮助中心</router-link
            >
            <!-- <span class="m-l-20">帮助中心</span> -->
          </div>
          <div class="head-line-right">
            <ul class="flex-r flex-e head-ul-list">
              <!-- <li>
                <span>请登录</span>
              </li>
              <li>|</li> -->
              <li>
                <router-link to="/regist" style="text-decoration: none;">
                  <span>快速注册</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginHead",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      keyWord: ""
    };
  },

  mounted() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/gloab.css";
a {
  text-decoraction: none !important;
}
router-link {
  text-decoraction: none;
}
.router-link-active {
  text-decoration: none;
}
.gray-head-bgc {
  background-color: #202020;
}
.content-login {
  width: 980px;
  margin: 0 auto;
}
.head-line {
  width: 100%;
  height: 80px;
  line-height: 80px;
  /* background-color: #f6f6fa; */
}
.head-line-left {
  width: 50%;
  text-align: left;
  /* background-color: bisque; */
}
.head-line-right {
  width: 50%;
  /* background-color: blueviolet; */
}
.head-ul-list li {
  margin-left: 10px;
}
</style>
