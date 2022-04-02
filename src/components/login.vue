<template>
  <div class="container bg-img">
    <loginHead></loginHead>
    <div class="content">
      <!-- <div>欢迎登录</div> -->
      <div class="flex-r flex-a">
        <!-- <img
          class="login-img m-t-30"
          src="../assets/img/login-img.png"
          alt=""
        /> -->
        <div class="login-box">
          <!-- <div class="login-content"></div> -->
          <loginBox></loginBox>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import loginHead from "./common/loginHead.vue";
import Footer from "./common/footer.vue";
import loginBox from "./common/loginBox.vue";
// import { goodsInfo } from "@/api/classfy";
export default {
  name: "login",
  components: {
    loginHead,
    Footer,
    loginBox
  },
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
@import "../assets/css/gloab.css";
body {
  /* background-color: #a30202; */
}
.login-img {
  width: 400px;
  height: 400px;
}
.login-box {
  width: 388px;
  height: 600px;
  padding-top: 100px;
  /* background-color: darkseagreen; */
}
.login-content {
  width: 100%;
  min-height: 260px;
  background-color: #fff;
}
.bg-img {
  background-image: url(../assets/img/login-bgi.png);
  background-size: 100% 785px;
}
</style>
