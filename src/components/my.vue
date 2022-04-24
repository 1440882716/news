<template>
  <div id="container">
    <myHeader></myHeader>
    <div class="content980 p-b-80">
      <!-- <div class="logo-box text-left flex-r">
        <img class="logo-img m-r-20" src="../assets/img/logo.png" alt="" />
        <h2 class="font18">个人中心</h2>
      </div> -->
      <div class="font14 text-left m-t-20">账户设置</div>
      <div class="user-content flex-r flex-b">
        <div class="my-nav-left font14 tips-color">
          <ul class="text-left nav-ul pointer">
            <li
              v-for="(item, index) in navList"
              :key="index"
              :class="[navNum == index ? 'main-red' : '']"
              @click="chooseNav(index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="my-nav-right">
          <!-- 个人资料 -->
          <myInfo v-show="navNum == 0" ref="child1"></myInfo>
          <!-- 账户安全 -->
          <Account v-show="navNum == 1"></Account>
          <!-- 我的银行卡 -->
          <!-- <myCard v-show="navNum == 2" ref="child2"></myCard> -->
          <!-- 常用地址 -->
          <myAddress v-show="navNum == 2" ref="child3"></myAddress>
          <!-- 发票抬头 -->
          <Invoice v-show="navNum == 3" ref="child4"></Invoice>
          <!-- 我的订单 -->
          <myOrder v-show="navNum == 4" ref="child5"></myOrder>
          <!-- 我的售后 -->
          <!-- <afterSale v-show="navNum == 5" ref="child6"></afterSale> -->
          <!-- 发票管理 -->
          <invoiceList v-show="navNum == 5" ref="child7"></invoiceList>
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
import myCard from "./common/myCard.vue";
import myAddress from "./common/myAddress.vue";
import Invoice from "./common/invoice.vue";
import myOrder from "./common/myOrder.vue";
import afterSale from "./common/afterSale.vue";
import invoiceList from "./common/invoiceList.vue";
import Footer from "./common/footer.vue";
export default {
  name: "my",
  components: {
    // 注册
    myHeader,
    Footer,
    myInfo,
    Account,
    myCard,
    Invoice,
    myOrder,
    myAddress,
    afterSale,
    invoiceList
  },
  data() {
    return {
      navNum: 0,
      navList: [
        "个人资料",
        "账户安全",
        // "我的银行卡",
        "常用地址",
        "发票抬头",
        "我的订单",
        // "我的售后",
        "发票管理"
      ]
    };
  },
  created() {
    this.navNum = this.$route.query.orderPage;
  },
  methods: {
    chooseNav(ind) {
      this.navNum = ind;

      if (ind == 0) {
        this.$refs.child1.getData();
      }
      //  else if (ind == 2) {
      // this.$refs.child2.getData();
      // }
      else if (ind == 2) {
        this.$refs.child3.getAddress();
      } else if (ind == 3) {
        this.$refs.child4.getData();
      } else if (ind == 4) {
        this.$refs.child5.getData();
      }
      // else if (ind == 5) {
      //   this.$refs.child6.getData();
      // }
      else if (ind == 5) {
        this.$refs.child7.getData();
      }
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
