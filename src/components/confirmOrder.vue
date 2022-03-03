<template>
  <div class="container">
    <Header></Header>
    <!-- 新增地址弹框 -->
    <addAddress ref="openBox"></addAddress>
    <div class="confirm-box p-b-80">
      <div class="text-left tips-title main-color">填写并核对订单信息</div>
      <div class="confirm-content main-color font14">
        <router-link to="./cart" style="text-decoration: none;">
          <div class="font14 pointer text-right">返回修改购物车</div>
        </router-link>

        <div class="confirm-title flex-r flex-b m-t-10">
          <span class="bold-font">收货人信息</span>
          <span class="myActiveColor pointer bold-font" @click="openAddBox"
            >新增收货地址</span
          >
        </div>
        <!-- 收货地址 -->
        <div class="text-left address-content ">
          <div v-if="addressList.length == 0">
            <span>获取地址失败或暂无收货地址</span>
            <div class="add-address-box pointer" @click="openAddBox">
              您还没有收货地址，赶快设置一个吧
            </div>
          </div>
          <div class="address-list-box f666" v-else>
            <div class="add-item-box flex-r flex-b" v-for="item in addressList">
              <div class="add-left flex-r">
                <div class="lable-box">{{ item.lable }}</div>
                <div class="m-r-10 ">{{ item.name }}</div>
                <div class="m-r-10 address-text">{{ item.address }}</div>
                <div class="m-r-10">{{ item.phone }}</div>
              </div>
              <div class="myActiveColor add-right text-right">
                <span class="m-r-20 pointer">删除</span>
                <span class="pointer">编辑</span>
              </div>
            </div>
          </div>
          <div class="order-box">
            <div class="confirm-title flex-r flex-b m-t-10 m-b-10">
              <span class="bold-font">订单列表</span>
              <!-- <span class="myActiveColor pointer" @click="openAddBox"
                >请核对</span
              > -->
            </div>
            <div
              class="cart-list flex-r font14 m-b-10"
              v-for="item in goodsList"
            >
              <div class="flex-r headline1">
                <!-- 商品图片 -->
                <div class="cart-goods-img pointer" @click="toDetail(item.id)">
                  <img :src="item.img" alt="" />
                </div>
              </div>
              <div class="flex-r headline2 flex-b">
                <div class="goods-name font14 text-left">{{ item.name }}</div>
                <div class="goods-info font12 gray-font-color change-buy-info">
                  <p style="text-align: left;">
                    <span class="justify">年度:</span>
                    <span>2022</span>
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">订阅选择:</span>
                    <span>自选定期</span>
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">起止日期:</span>
                    <span>2022-02-21~2022-12-31</span>
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">期数:</span>
                    <span>314</span>
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">刊期:</span>
                    <span>0221~1231</span>
                  </p>
                </div>
              </div>
              <div class="headline3 font14 myActiveColor bold-font text-right">
                {{ item.price }}
              </div>
              <div class="headline5 price-color font16 bold600">
                {{ item.count }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-c flex-e m-t-20 f666">
        <div class="text-right m-b-10">
          <span class="font14 bold-font">共 </span>
          <span class="font14 bold-font myActiveColor">2</span>
          <span class="font14 bold-font"> 件</span>
          <span class="font14 bold-font">合计：</span>
          <span class="font14 myActiveColor">¥ </span>
          <span class="font20 bold-font myActiveColor">246.4</span>
        </div>
        <div class="text-right m-b-10">
          <span class="font14 bold-font">寄送至：</span
          ><span class="font14"
            >四川省成都市郫都区龙湖时代天街成都市郫都区龙湖时代天街</span
          >
        </div>
        <div class="text-right m-b-10">
          <span class="font14 bold-font">收货人：</span
          ><span class="font14">小七 17608086789</span>
        </div>
        <div class="flex flex-e">
          <div class="handle-order fff-font pointer">提交订单</div>
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
          phone: "17608086789",
          lable: "公司"
        },
        {
          name: "hhh",
          address: "四川省成都市郫都区龙湖时代天街成都市郫都区龙湖时代天街",
          phone: "17608086789",
          lable: "家"
        },
        {
          name: "77",
          address: "四川省成都市郫都区龙湖时代天街",
          phone: "17608086789",
          lable: "公司"
        },
        {
          name: "hhh",
          address: "四川省成都市郫都区龙湖时代天街成都市郫都区龙湖时代天街",
          phone: "17608086789",
          lable: "家"
        },
        {
          name: "77",
          address: "四川省成都市郫都区龙湖时代天街",
          phone: "17608086789",
          lable: "公司"
        }
      ],
      goodsList: [
        {
          img:
            "https://bic.11185.cn/zxpt-sc-cnt/upload/1/1-83/20151106152915_1.jpg",
          name: "人民日报海外版2022自选定期",
          price: 123.2,
          // count: 123.2,
          num: 1,
          dateStart: "",
          dateEnd: ""
        },
        {
          img:
            "https://bic.11185.cn/zxpt-sc-cnt/upload/1/1-96/20120828200025_1.jpg",
          name: "人民日报海外版2022自选定期人民日报海外版2022自选定期",
          price: 123.2,
          // count: 123.2,
          num: 1,
          dateStart: "",
          dateEnd: ""
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
