<template>
  <div class="header">
    <div class="container ">
      <div class="v1-head-box">
        <div class=" font16 fff-font content flex-r flex-b tips-color">
          <div class="head-line-left">
            <span v-if="toHome">您好，欢迎来到报刊订阅平台</span>
            <!-- <span v-else>回到首页</span> -->
            <router-link v-else to="/" style="text-decoration: none;"
              >回到首页</router-link
            >
          </div>
          <div class="head-line-right flex-r flex-e">
            <ul class="flex-r flex-e head-ul-list pointer">
              <li @click="toMypage(0)">
                个人中心
              </li>
              <li @click="toMypage(4)">我的订单</li>
              <li>
                <router-link to="./cart" style="text-decoration: none;"
                  >购物车</router-link
                >
              </li>
              <li>
                <!-- 帮助中心 -->
                <router-link
                  to="./help"
                  style="text-decoration: none;color: white;"
                  >帮助中心</router-link
                >
              </li>
            </ul>
            <router-link
              to="./login"
              v-if="isLogin == 'false'"
              style="text-decoration: none;"
            >
              <span class="m-l-20">请登录</span>
            </router-link>
            <span class="m-l-20" v-else>已登录</span>

            <span
              v-if="isLogin != 'false'"
              @click="logoutFun"
              style="text-decoration: none;"
              class="m-l-20 pointer"
              >退出</span
            >
            <!-- </router-link> -->

            <router-link to="./regist" v-else style="text-decoration: none;">
              <span class="m-l-20">快速注册</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken, getLogin, removeToken, removeLogin } from "@/utils/auth";
import { logout } from "@/api/login";
export default {
  name: "index",
  data() {
    return {
      isLogin: false,
      toHome: true,
      loginTxt: "请登录",
      keyWord: ""
    };
  },
  created() {
    // let aaa = getToken();
    this.isLogin = getLogin();
    console.log(this.$route.path);
    if (this.$route.path == "/") {
      this.toHome = true;
    } else {
      this.toHome = false;
    }
    // debugger;
  },
  mounted() {},
  methods: {
    loginOut() {
      removeToken();
      removeLogin();

      this.$router.push({
        path: "/",
        name: "index"
      });
    },
    toMypage(num) {
      this.$router.push({
        path: "/My",
        name: "My",
        query: {
          orderPage: num
        }
      });
    },
    // 推出登录
    logoutFun() {
      // console.log(6666);
      // debugger;
      // return;
      logout().then(res => {
        if (res.code == 200) {
          // this.isLogin = false;
          // debugger;
          removeToken();
          removeLogin();

          this.$router.push({
            path: "/login",
            name: "login"
          });
        } else {
          removeToken();
          removeLogin();
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
.head-line {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: #f6f6fa;
}
.head-line-left {
  width: 30%;
  text-align: left;
}
.head-line-right {
  width: 60%;
}
.head-ul-list li {
  margin-left: 10px;
}

/* ============================================最终版 */
.v1-head-box {
  /* width: 100%; */
  height: 80px;
  line-height: 80px;
  padding-left: 100px;
  padding-right: 100px;
  background-color: #37312b;
}
</style>
