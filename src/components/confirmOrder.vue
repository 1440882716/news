<template>
  <div class="container">
    <msgBox></msgBox>
    <Header></Header>
    <!-- 新增地址弹框 -->
    <addAddress
      ref="openBox"
      :addData="addressList"
      :upData="itemAddress"
      @changeData="setData($event)"
    ></addAddress>
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
            <div
              class="add-item-box flex-r flex-b"
              v-for="(item, index) in addressList"
              key="index"
            >
              <div class="add-left flex-r">
                <div class="m-r-10 font18" @click="chooseAdd(index, item)">
                  <i
                    :class="[
                      'el-icon-success',
                      ind == index ? 'myActiveColor' : 'f999'
                    ]"
                  ></i>
                  <!-- <img
                    class="choose-cart-icon m-l-20 m-t-5"
                    src="../assets/img/choosed.png"
                    alt=""
                  />
                  <img
                    class="choose-cart-icon m-l-20 m-t-5"
                    src="../assets/img/not-choose.png"
                    alt=""
                  /> -->
                </div>
                <div class="m-r-10 ">{{ item.name }}</div>
                <div class="m-r-10 address-text">
                  {{ item.area }} {{ item.address }}
                </div>
                <div class="m-r-10">{{ item.mobile }}</div>
              </div>
              <div class="myActiveColor add-right text-right">
                <span class="m-r-20 pointer" @click="delAddFun(item.id)"
                  >删除</span
                >
                <!-- <span class="pointer" @click="updAddFun(item)">编辑</span> -->
              </div>
            </div>
          </div>
          <div class="order-box">
            <div class="confirm-title flex-r flex-b m-t-10 m-b-10">
              <span class="bold-font">订单列表</span>
            </div>
            <div
              class="cart-list flex-r font14 m-b-10"
              v-for="item in goodsList"
            >
              <div class="flex-r headline1">
                <!-- 商品图片 -->
                <div
                  class="cart-goods-img pointer"
                  @click="toDetail(item.paperId)"
                >
                  <img :src="item.pics" alt="" />
                </div>
              </div>
              <div class="flex-r headline2 flex-b">
                <div class="goods-name font14 text-left">{{ item.name }}</div>
                <div class="goods-info font12 gray-font-color change-buy-info">
                  <p style="text-align: left;">
                    <span class="justify">年度:</span>
                    <span>{{ item.paperYear }}</span>
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">订阅选择:</span>
                    <span>自选定期</span>
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">起止日期:</span>
                    <span>{{ item.startrTime }}~{{ item.endTime }}</span>
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">期数:</span>
                    <span>{{ item.periodNum }}</span>
                  </p>
                  <!-- <p style="text-align: left;">
                    <span class="justify">刊期:</span>
                    <span>0221~1231</span>
                  </p> -->
                </div>
              </div>
              <div class="headline3 font14 f666 bold-font text-right">
                {{ item.price }}
              </div>
              <div class="headline4 font14 f666 bold-font text-right">
                x{{ item.quantity }}
              </div>
              <div class="headline5 price-color font16 bold600 text-right">
                {{ item.price * item.quantity }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-c flex-e m-t-20 f666">
        <div class="text-right m-b-10">
          <span class="font14 bold-font">共 </span>
          <span class="font14 bold-font myActiveColor">{{
            goodsList.length
          }}</span>
          <span class="font14 bold-font"> 件</span>
          <span class="font14 bold-font">合计：</span>
          <span class="font14 myActiveColor">¥ </span>
          <span class="font20 bold-font myActiveColor">246.4</span>
        </div>
        <div class="text-right m-b-10">
          <span class="font14 bold-font">寄送至：</span
          ><span class="font14"
            >{{ itemAddress.area }} {{ itemAddress.address }}</span
          >
        </div>
        <div class="text-right m-b-10">
          <span class="font14 bold-font">收货人：</span
          ><span class="font14"
            >{{ itemAddress.name }} {{ itemAddress.mobile }}</span
          >
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
import msgBox from "./common/msg.vue";
import { addList, delAdd } from "@/api/address";
import { confirmUrl } from "@/api/cart";
export default {
  name: "confirm",
  components: {
    Header,
    addAddress,
    Footer,
    msgBox
  },
  data() {
    return {
      isOpen: false,
      ind: 0,
      goodsId: "",
      goodsCount: 0,
      itemAddress: {},
      addressList: [],
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
  created() {
    this.goodsId = this.$route.query.goodsId;
    this.getAddress();
    this.getGoods();
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
    },
    getAddress() {
      addList().then(res => {
        if (res.code == 200) {
          this.addressList = res.data;
          for (let i = 0; i < this.addressList.length; i++) {
            if (this.addressList[i].is_default) {
              this.itemAddress = this.addressList[i];
              this.ind = i;
            }
          }
        }
      });
    },
    // 获取下订单的商品数据
    getGoods() {
      confirmUrl({ cartList: this.goodsId }).then(res => {
        if (res.code == 200) {
          this.goodsList = res.data;
        }
      });
    },
    // 新增地址后关闭弹框 更新地址列表
    setData(msg) {
      this.addressList = msg;
    },
    delAddFun(id) {
      delAdd({ id: id }).then(res => {
        if (res.code == 200) {
          this.getAddress();
        } else {
          this.$refs.tips.toast(res.msg);
        }
      });
    },
    chooseAdd(num, info) {
      this.ind = num;
      this.itemAddress = info;
    }
    // 编辑地址
    // updAddFun(info) {
    //   this.itemAddress = info;
    //   this.$refs.openBox.openDialog();
    // }
  }
};
</script>
<style>
@import "../assets/css/gloab.css";
@import "../assets/css/confirmOrder.css";
</style>
