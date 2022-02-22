<template>
  <div class="header">
    <div class="container-my">
      <div class="head-line">
        <div class=" font12  flex-r flex-b fff-font">
          <div class="head-line-left">
            <span>您好，欢迎来到报刊订阅平台</span>
            <router-link
              to="./login"
              style="text-decoration: none;color: white;"
            >
              <span class="m-l-20">请登录</span>
            </router-link>
            <router-link
              to="./regist"
              style="text-decoration: none;color: white;"
            >
              <span class="m-l-20">快速注册</span>
            </router-link>
          </div>
          <div class="head-line-right">
            <ul class="flex-r flex-e head-ul-list">
              <li>
                <router-link
                  to="./my"
                  style="text-decoration: none;color: white;"
                  >个人中心</router-link
                >
              </li>
              <li>我的订单</li>
              <li>
                <router-link
                  to="./cart"
                  style="text-decoration: none;color: white;"
                  >购物车</router-link
                >
              </li>
              <li>帮助中心</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
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
.header {
  width: 100%;
  background-image: linear-gradient(
    90deg,
    #1058ac 0%,
    #2269bb 23%,
    #2f75c5 56%,
    #498ddc 85%,
    #409eff 100%
  );
}
.container-my {
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
  width: 30%;
  text-align: left;
  /* background-color: bisque; */
}
.head-line-right {
  width: 60%;
  /* background-color: blueviolet; */
}
.head-ul-list li {
  margin-left: 10px;
}
</style>
