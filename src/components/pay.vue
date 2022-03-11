<template>
  <div class="container">
    <div class="pay-header">
      <div class="content980 text-left">
        <span class="fff-font font24">收银台</span>
        <div class="m-t-20 pay-box-page ">
          <div class="m-t-10 m-l-30">
            距离二维码过期还剩
            <span class="price-main">{{ count }}</span>
            秒，过期后请刷新页面重新获取二维码。
          </div>
          <div class="flex-r">
            <!-- <div class="qr-box m-r-20 m-l-20" v-if="payWay == 1">
              <img src="../assets/img/qrcode.png" alt="图片出错了" />
            </div> -->
            <!-- 二维码 -->
            <div
              id="qrcode"
              class="m-r-20 m-l-20 m-t-20"
              v-if="payWay == 1 || payWay == 2"
            ></div>
            <!-- 微信展示 -->
            <div class="font14 m-t-20">
              <p class="font16">订单提交成功！请尽快完成支付~</p>
              <p>商户名称：某某某某</p>
              <p>商品名称：报刊业务订单</p>
              <div class="pay-img-box">
                <span>扫码支付：</span>
                <img
                  v-if="payWay == 2"
                  class="pay-icon-box"
                  src="../assets/img/zfbpay.png"
                  alt=""
                />
                <img
                  v-if="payWay == 1"
                  class="pay-icon-wx"
                  src="../assets/img/wxlogo.png"
                  alt=""
                />
              </div>
            </div>
            <!-- 价钱 -->
            <div class="text-right price-box font14">
              支付金额：<span class="font14 price-main">¥ </span
              ><span class="font18 price-main">24.99</span>
            </div>
            <!-- <div class="pointer" @click="getQR">测试获取二维码</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
import { orderPay, wxPay } from "@/api/cart";
export default {
  name: "pay",
  components: { QRCode },
  data() {
    return {
      orderId: "",
      payWay: 0,
      count: 0,
      navList: [],
      wxCode: "",
      zfbUrl: "https://qr.alipay.com/bax06387rh8te3fxuczd004d"
    };
  },
  created() {
    this.orderId = this.$route.query.orderId;
    this.payWay = this.$route.query.payWay;
    this.getPayImg();
  },
  methods: {
    getPayImg() {
      let data = {
        orderId: this.orderId
        //    payType:this.payWay
      };
      if (this.payWay == 1) {
        //   微信支付
        wxPay(data).then(res => {
          if (res.code == 200) {
            this.zfbUrl = res.data;
            this.getQR();
            this.countDown();
          }
        });
      } else if (this.payWay == 2) {
        //   支付宝支付
        orderPay(data).then(res => {
          if (res.code == 200) {
            if (this.payWay == 2) {
              this.zfbUrl = res.data;
              this.getQR();
              this.countDown();
            }
          }
        });
      }
    },
    countDown() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.timeFlag = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.timeFlag = true;
            clearInterval(this.timer);
            this.timer = null;
            this.count = 0;
          }
        }, 1000);
      }
    },
    qrcode() {
      let that = this;
      let qrcode = new QRCode("qrcode", {
        width: 124,
        height: 124, // 高度
        text: this.zfbUrl // 二维码内容
        // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f',   // 背景色
        // foreground: '#ff0'    // 前景色
      });
    },
    getQR() {
      this.$nextTick(function() {
        this.qrcode();
      });
    }
  }
};
</script>
<style>
@import "../assets/css/gloab.css";
@import "../assets/css/pay.css";
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
