<template>
  <div class="container">
    <msgBox ref="tips"></msgBox>
    <div class="pay-header">
      <div class="content980 text-left">
        <span class="fff-font font24">收银台</span>
        <div class="m-t-20 pay-box-page ">
          <div class="m-t-10 m-l-30" v-if="payWay == 1 || payWay == 2">
            距离二维码过期还剩
            <span class="price-main">{{ count }}</span>
            秒，过期后请刷新页面重新获取二维码。
          </div>
          <div class="flex-r flex-b">
            <!-- <div class="qr-box m-r-20 m-l-20" v-if="payWay == 1">
              <img src="../assets/img/qrcode.png" alt="图片出错了" />
            </div> -->
            <!-- 微信和支付宝支付的二维码 -->
            <div
              id="qrcode"
              class="m-r-20 m-l-20 m-t-20"
              v-if="payWay == 1 || payWay == 2"
            ></div>
            <!-- 银行卡 -->
            <div v-if="payWay == 3"></div>
            <!-- 上传线下支付凭证 -->
            <div v-if="payWay == 4">
              <el-upload
                class="avatar-uploader m-t-20"
                :headers="{ Authorization: token }"
                action="https://admin.cdzkzs.top/client/order/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="voucherImg" :src="voucherImg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <!-- 微信展示 -->
            <div class="font14 m-t-20 order-pay-det">
              <p class="font16">订单提交成功！请尽快完成支付~</p>
              <p>商户名称：某某某某</p>
              <p>商品名称：{{ goodsName }}</p>
              <div class="pay-img-box" v-if="payWay == 1 || payWay == 2">
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
              <div v-if="payWay == 4" class="flex-r">
                <span>凭证单位备注：</span>
                <el-input
                  class="remark-inp-order"
                  v-model="unitRemarks"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </div>
            <!-- 价钱 -->
            <div class="text-right price-box font14">
              支付金额：<span class="font14 price-main">¥ </span
              ><span class="font18 price-main">{{ money }}</span>
              <!-- <div
                class="handle-voucher pointer"
                v-if="payWay == 4"
                @click="handleVoucher"
              >
                提交支付凭证
              </div> -->
              <el-button
                class="handle-voucher"
                v-if="payWay == 4"
                @click="handleVoucher"
                type="primary"
                >提交支付凭证</el-button
              >
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
import { orderPay, wxPay, unionPay, payQuery } from "@/api/cart";
import msgBox from "./common/msg.vue";
import { getToken } from "@/utils/auth";
export default {
  name: "pay",
  components: { QRCode, msgBox },
  data() {
    return {
      orderId: "",
      goodsName: "",
      payWay: 0,
      count: 0,
      navList: [],
      wxCode: "",
      token: "",
      zfbUrl: "https://qr.alipay.com/bax06387rh8te3fxuczd004d",
      voucherImg: "",
      dataImg: "",
      unitRemarks: "",
      money: 0
    };
  },
  created() {
    this.orderId = this.$route.query.orderId;
    this.payWay = this.$route.query.payWay;
    this.money = this.$route.query.money;
    this.goodsName = this.$route.query.name;
    this.getPayImg();
    this.token = getToken();
  },
  methods: {
    getPayImg() {
      let data = {
        orderId: this.orderId,
        payType: this.payWay
      };
      if (this.payWay == 1 || this.payWay == 2) {
        //   支付宝\微信支付
        orderPay(data).then(res => {
          if (res.code == 200) {
            // if (this.payWay == 2) {
            this.zfbUrl = res.data;
            this.getQR();
            this.countDown();
            this.getResult();
            // }
          }
        });
      } else if (this.payWay == 3) {
        // 查询银联的支付结果
        this.getResult();
        // 银联支付
        unionPay({ orderId: this.orderId }).then(res => {
          // console.log(res);
          window.localStorage.removeItem("callbackHTML");
          window.localStorage.setItem("callbackHTML", res);
          var newWin = window.open("");
          newWin.document.write(localStorage.getItem("callbackHTML"));
          newWin.document.close();
        });
      }
    },
    // 上传凭证支付
    // 上传凭证图片
    handleAvatarSuccess(res, file) {
      this.voucherImg = URL.createObjectURL(file.raw);
      if (res.code == 200) {
        this.dataImg = res.location;
      }
      // console.log(res.data);
      // this.$refs.tips.toast(res.msg);
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$refs.tips.toast("上传头像图片只能是 JPG、png 格式!");
      }
      if (!isLt2M) {
        this.$refs.tips.toast("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 上传凭证
    handleVoucher() {
      let data = {
        orderId: this.orderId,
        payType: this.payWay,
        imgUrl: this.dataImg,
        unitRemarks: this.unitRemarks
      };
      orderPay(data).then(res => {
        if (res.code == 200) {
          this.$refs.tips.toast(res.msg);
          // 上传凭证审核中  去到订单页面
          this.$router.push({
            path: "/My",
            name: "My",
            query: {
              orderPage: 5
            }
          });
        }
      });
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
    },

    getResult() {
      let timer = setInterval(() => {
        payQuery({ orderId: this.orderId }).then(res => {
          if (res.code == 200) {
            clearInterval(timer);
          } else {
            setTimeout(() => {
              clearInterval(timer);
              this.$router.push({
                path: "/My",
                name: "My",
                query: {
                  orderPage: 4
                }
              });
            }, 120000);
          }
        });
      }, 2000);
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
