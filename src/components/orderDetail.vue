<template>
  <div id="container" style="height: 940px;position: relative;">
    <msgBox ref="tips"></msgBox>
    <myHeader></myHeader>
    <!-- <span>订单详情</span> -->
    <div class="content980 text-left">
      <!-- <img class="logo-img m-t-20 " src="../assets/img/logo.png" alt="" /> -->
      <div class="flex-r flex-b order-step m-t-20">
        <div class="order-step-left font12 main-color">
          <span>订单号：{{ orderId }}</span>
          <div class="font20 bold-font deep-blue m-t-20">
            {{ orderInfo.orderStatusName }}
          </div>
        </div>
        <div class="order-step-right flex-r flex-b font14">
          <div class="flex-c font12 buyer-info">
            <span class="font16">收货人信息</span>
            <div>收件人：{{ buyerInfo.name }}</div>
            <div>手机号码：{{ buyerInfo.mobile }}</div>
            <div class="address-text">收货地址：{{ buyerInfo.address }}</div>
          </div>
          <div class="flex-c font12 pay-info-de">
            <span class="font16">支付信息</span>
            <div>支付状态：{{ orderInfo.payStatusName }}</div>
            <div>支付方式：{{ orderInfo.payName }}</div>
            <div>应付金额：￥{{ orderInfo.totalPrice.toFixed(2) }}</div>
          </div>
        </div>
      </div>
      <!-- 订单流程 、商品信息-->
      <div class="flex-r  m-t-20 step-goods">
        <div class="order-step-box">
          <div class="font16 m-b-20">订单流程</div>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.crtTime"
            >
              {{ activity.flowName }}
            </el-timeline-item>
          </el-timeline>
        </div>
        <!-- 订单的商品信息 -->
        <div class="order-de-goods">
          <div class="flex-r font12 flex-b goods-title-de text-center">
            <div class="de-title1">商品</div>
            <div class="de-title2">数量</div>
            <div class="de-title2">价格</div>

            <!-- <div class="de-title2">小计</div> -->
          </div>
          <div class="flex-r de-goods-item flex-b text-center m-b-10">
            <div class="de-title1 flex-r">
              <div
                class="de-img-box m-l-20 p-b-10 p-t-10"
                @click="toDetail(goodsInfo.paperId)"
              >
                <img class="de-img" :src="goodsInfo.pics" alt="" />
              </div>
              <div class="flex-c font12 m-l-20 m-t-10 text-left">
                <span class="font14">{{ goodsInfo.name }}</span>
                <span
                  >起止日期：{{ goodsInfo.startDate }}~{{
                    goodsInfo.endDate
                  }}</span
                >
                <span>期数：{{ goodsInfo.cycleNum }}</span>
              </div>
            </div>
            <div class="de-title2 font12 m-t-20">{{ goodsInfo.number }}</div>
            <div class="de-title2 font12 m-t-20">
              {{ goodsInfo.realPrice.toFixed(2) }}
            </div>

            <!-- <div class="de-title2 font12 m-t-20">
              {{ goodsInfo.realPrice.toFixed(2) }}
            </div> -->
          </div>
          <div class="m-l-10 m-b-10 font14">
            订单备注：{{ orderInfo.remark }}
          </div>
        </div>
      </div>
      <div class="text-right m-b-80 font12 bold-font m-t-10">
        商品总额<span class="font16 price-color m-r-20"
          >￥{{ orderInfo.totalPrice.toFixed(2) }}</span
        >
        应支付<span class="font16 price-color"
          >￥{{ orderInfo.totalPrice.toFixed(2) }}</span
        >
      </div>
    </div>

    <Footer style="position: absolute;bottom: 0;"></Footer>
  </div>
</template>
<script>
import myHeader from "./common/myHeader.vue";
import Footer from "./common/footer.vue";
import msgBox from "./common/msg.vue";
import { orderDetail, orderCancel, orderDel } from "@/api/order";
export default {
  name: "orderDetails",
  components: {
    // 注册
    myHeader,
    Footer,
    msgBox
  },
  data() {
    return {
      orderId: "",
      buyerInfo: {},
      orderInfo: {},
      goodsInfo: {},
      activities: []
    };
  },
  created() {
    this.orderId = this.$route.query.orderId;
    console.log(this.orderId);
    if (this.orderId != "") {
      this.getData();
    }
  },
  methods: {
    getData() {
      orderDetail({ id: this.orderId }).then(res => {
        if (res.code == 200) {
          this.orderInfo = res.data;
          this.buyerInfo = res.data.addressInfo;
          this.goodsInfo = res.data.goods;
          this.activities = res.data.orderFlow;
          // console.log(res)
          // debugger;
        }
      });
    },
    // 商品详情
    toDetail(id) {
      this.$router.push({
        path: "/details",
        name: "details",
        query: {
          goodsId: id
        }
      });
    }
  }
};
</script>
<style>
@import "../assets/css/gloab.css";
@import "../assets/css/orderDetail.css";
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
