<template>
  <div class="header">
    <div class="container gray-head-bgc">
      <div class="head-line">
        <div class="content-login font12  flex-r flex-b tips-color">
          <div class="head-line-left">
            <span>您好，欢迎来到报刊订阅平台</span>
            <router-link to="/" style="text-decoration: none;">
              <span class="m-l-20">返回首页</span>
            </router-link>
            <span class="m-l-20">帮助中心</span>
          </div>
          <div class="head-line-right">
            <ul class="flex-r flex-e head-ul-list">
              <li>
                <router-link to="/login" style="text-decoration: none;">
                  <span>请登录</span>
                </router-link>
              </li>
              <li>|</li>
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
  background-color: #f6f6fa;
}
.content-login {
  width: 980px;
  margin: 0 auto;
}
.head-line {
  width: 100%;
  height: 30px;
  line-height: 30px;
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
