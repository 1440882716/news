<template>
  <div class="container">
    <Header></Header>
    <!-- 新增地址弹框 -->
    <addAddress ref="openBox"></addAddress>
    <div class="confirm-box p-b-80">
      <div class="text-left tips-title main-color">填写并核对订单信息</div>
      <div class="confirm-content main-color font14">
        <div class="font14 pointer text-right">返回修改购物车</div>
        <div class="confirm-title flex-r flex-b m-t-10">
          <span class="bold-font">收货人信息</span>
          <span class="myActiveColor pointer" @click="openAddBox"
            >新增收货地址</span
          >
        </div>
        <!-- 收货地址 -->
        <div class="text-left">
          <div v-if="addressList.length == 0">
            <span>获取地址失败或暂无收货地址</span>
            <div class="add-address-box pointer" @click="openAddBox">
              您还没有收货地址，赶快设置一个吧
            </div>
          </div>
          <div v-else>
            <div class="add-item-box" v-for="item in addressList"></div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "./common/header.vue";
import addAddress from "./common/addAddress.vue";
import Footer from "./common/footer.vue";
export default {
  name: "confirm",
  components: {
    Header,
    addAddress,
    Footer
  },
  data() {
    return {
      isOpen: false,
      addressList: [
        {
          name: "77",
          address: "四川省成都市郫都区龙湖时代天街",
          phone: "17608086789"
        }
      ]
    };
  },
  methods: {
    chooseNav(ind) {
      // window.alert("111");
      // console.log(ind);
      this.navNum = ind;
      // debugger;
    },
    openAddBox() {
      this.$refs.openBox.openDialog();
    }
  }
};
</script>
<style>
@import "../assets/css/gloab.css";
@import "../assets/css/confirmOrder.css";
</style>
