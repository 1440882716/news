<template>
  <div id="container">
    <myHeader></myHeader>
    <div class="content980 p-b-80">
      <div class="logo-box text-left flex-r">
        <img class="logo-img m-r-20" src="../assets/img/logo.png" alt="" />
        <h2 class="font18">个人中心</h2>
      </div>
      <div class="font14 text-left">账户设置</div>
      <div class="user-content flex-r flex-b">
        <div class="my-nav-left font14 tips-color">
          <ul class="text-left nav-ul pointer">
            <li
              v-for="(item, index) in navList"
              :key="index"
              :class="[navNum == index ? 'myActiveColor' : '']"
              @click="chooseNav(index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="my-nav-right">
          <!-- 个人资料 -->
          <myInfo v-show="navNum == 0"></myInfo>
          <!-- 账户安全 -->
          <Account v-show="navNum == 1"></Account>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import myHeader from "./common/myHeader.vue";
import myInfo from "./common/myInfo.vue";
import Account from "./common/account.vue";
import Footer from "./common/footer.vue";
export default {
  name: "my",
  components: {
    // 注册
    myHeader,
    Footer,
    myInfo,
    Account
  },
  data() {
    return {
      navNum: 0,
      navList: [
        "个人资料",
        "账户安全",
        "我的银行卡",
        "常用地址",
        "发票抬头",
        "我的订单",
        "我的售后",
        "发票管理"
      ]
    };
  },
  methods: {
    chooseNav(ind) {
      // window.alert("111");
      // console.log(ind);
      this.navNum = ind;
      // debugger;
    }
  }
};
</script>
<style>
@import "../assets/css/gloab.css";
.logo-box {
  padding: 30px 0;
  line-height: 45px;
}
.logo-img {
  width: 165px;
  height: 45px;
}
.user-content {
  width: 100%;
}
.my-nav-left {
  width: 85px;
}
.nav-ul li {
  width: 100%;
  height: 32px;
  line-height: 32px;
}
.my-nav-right {
  width: calc(100% - 100px);
  min-height: 500px;
  /* background-color: darkcyan; */
}
</style>
