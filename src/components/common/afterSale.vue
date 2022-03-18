<template>
  <div class="my-info">
    <msgBox ref="tips"></msgBox>
    <div class="info-content text-left">
      <div class="title-box flex-r flex-b">
        <div class="my-info-title">
          我的售后
        </div>
      </div>
      <div class="info-content">
        <div class="order-item-box font14 m-b-20 m-t-10">
          <div class="flex-r flex-b order-head-box">
            <div>
              <span>2022-03-16 10:15:23</span>
              <span class="m-l-10">收货人：7777</span>
            </div>
            <div class="flex-r">
              <div class="handle-btn pointer" @click="cancelFun(item.id)">
                取消退订
              </div>
            </div>
          </div>
          <div class="flex-r flex-b order-count font12">
            <div>
              <span class="m-r-20">订单号：12413514623</span>
              <span>订单总额：12.34</span>
            </div>
          </div>
          <div class="flex-r flex-b order-goods-item-box">
            <div class="flex-r">
              <div class="order-img-box pointer" @click="toGoodsInfo(item)">
                <img
                  class="order-goods-img"
                  src="../../assets/img/mzfz.png"
                  alt=""
                />
              </div>
              <div class="flex-r pointer" @click="orderDetailFun(item)">
                <div class="font14 f999 flex-c">
                  <p class="font16  main-color">人民日报</p>
                  <p style="text-align: left;">
                    <span class="justify">起止日期：</span>
                    <span>2022-03-16 10:15:23~2022-03-16 10:15:23</span>
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">期数：</span>
                    <span>6</span>
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">数量：</span>
                    <span>2</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              金额：<span class="price-main font16 bold-font">12.38</span>
            </div>
          </div>
          <!-- <el-divider></el-divider> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { addInvoice, updInvoice, pageData, delInvoice } from "@/api/invoice";
import msgBox from "./msg.vue";
export default {
  name: "mycard",
  components: {
    msgBox
  },
  data() {
    return {};
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let data = {
        // page: this.page,
        // limit: this.limit
      };
      pageData(data).then(res => {
        if (res.code == 200) {
          //   this.invoiceList = res.data;
        }
      });
    },
    orderDetailFun(info) {
      this.$router.push({
        path: "/orderDetail",
        name: "orderDetail",
        query: {
          orderId: info.id
        }
      });
    }
  }
};
</script>
<style scoped>
.info-content {
  width: 100%;
}
.title-box {
  border-bottom: 2px solid #e5e5e5;
}
.my-info-title {
  width: 140px;
  padding-bottom: 8px;
}
.my-info-box {
  width: 100%;
  min-height: 300px;
  margin-top: 10px;
  background: url("../../assets/img/emptyInvoice.png") center center no-repeat;
  background-size: 300px 300px;
  text-align: center;
  /* padding-top: 500px; */
}
.order-item-box {
  border: 1px solid #e5e5e5;
}
.order-head-box {
  padding: 8px 15px;
  height: 40px;
  line-height: 40px;
  /* background-color: darkcyan; */
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 10px;
}
.handle-btn {
  /* padding: 5px; */
  width: 70px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border: 1px solid #409eff;
  border-radius: 6px;
  color: #409eff;
  margin-top: 5px;
}
.order-count {
  padding: 0 15px 10px 15px;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 10px;
}
.order-goods-item-box {
  padding: 0px 15px 8px 15px;
}
.order-img-box {
  width: 120px;
  height: 100px;
}
.order-goods-img {
  width: 80px;
  height: 100px;
}
</style>
