<template>
  <div id="container">
    <Header></Header>

    <Footer></Footer>
  </div>
</template>
<script>
import Header from "./common/header.vue";

import Footer from "./common/footer.vue";
export default {
  name: "confirm",
  components: {
    Header,
    Footer
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
