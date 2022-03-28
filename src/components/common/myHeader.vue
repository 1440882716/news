<template>
  <div class="header">
    <div class="container-my">
      <div class="head-line">
        <div class=" font14  flex-r flex-b fff-font">
          <div class="head-line-left">
            <span>您好，欢迎来到报刊订阅平台</span>
            <router-link to="/" style="text-decoration: none;color: white;">
              <span class="m-l-20">返回首页</span>
            </router-link>
            <!-- <router-link
              to="./login"
              style="text-decoration: none;color: white;"
            >
              <span class="m-l-20">请登录</span>
            </router-link> -->
            <!-- <router-link
              to="./regist"
              style="text-decoration: none;color: white;"
            >
              <span class="m-l-20">快速注册</span>
            </router-link> -->
          </div>
          <div class="head-line-right pointer">
            <ul class="flex-r flex-e head-ul-list">
              <li @click="toMypage(0)">
                个人中心
              </li>
              <li @click="toMypage(5)">我的订单</li>
              <li>
                <router-link
                  to="./cart"
                  style="text-decoration: none;color: white;"
                  >购物车</router-link
                >
              </li>
              <li>
                <router-link
                  to="./help"
                  style="text-decoration: none;color: white;"
                  >帮助中心</router-link
                >
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
  name: "index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      keyWord: ""
    };
  },

  mounted() {},
  methods: {
    toMypage(num) {
      this.$router.push({
        path: "/My",
        name: "My",
        query: {
          orderPage: 0
        }
      });
    }
  }
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
  background-color: #37312b;
  /* background-image: linear-gradient(
    90deg,
    #a30202 0%,
    #b60202 23%,
    #cb0303 56%,
    #e01313 85%,
    #f32626 100%
  ); */
}
.container-my {
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
  width: 40%;
  /* background-color: blueviolet; */
}
.head-ul-list li {
  margin-left: 10px;
}
</style>
