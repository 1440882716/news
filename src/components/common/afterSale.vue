<template>
  <div class="my-info">
    <msgBox ref="tips"></msgBox>
    <div class="info-content text-left">
      <div class="title-box flex-r flex-b">
        <div class="my-info-title">
          退订订单
        </div>
      </div>
      <div class="info-content">
        <div
          class="order-item-box font14 m-b-20 m-t-10"
          v-for="item in backList"
        >
          <div class="flex-r flex-b order-head-box">
            <div>
              <span>申请时间:{{ item.createTime }}</span>
              <!-- <span class="m-l-10">收货人：7777</span> -->
            </div>
            <div class="flex-r">
              <div
                class="handle-btn pointer"
                v-if="item.status == 6"
                @click="cancelFun(item.backOrderId)"
              >
                取消退订
              </div>
              <div
                class="handle-btn pointer"
                v-if="item.status == 7"
                @click="delFun(item.backOrderId)"
              >
                删除
              </div>
            </div>
          </div>
          <div class="flex-r flex-b order-count font12">
            <div class="flex-r flex-b back-status">
              <div class="m-r-20">退订单号：{{ item.backOrderId }}</div>
              <div>{{ item.statusName }}</div>
            </div>
          </div>
          <div class="flex-r flex-b order-goods-item-box">
            <div class="flex-r">
              <div class="order-img-box pointer" @click="toGoodsInfo(item)">
                <img class="order-goods-img" :src="item.pics" alt="" />
              </div>
              <div class="flex-r pointer" @click="orderDetailFun(item)">
                <div class="font14 f999 flex-c">
                  <p class="font16  main-color">{{ item.name }}</p>
                  <p style="text-align: left;">
                    <span class="justify">退订日期：</span>
                    <span>{{ item.backDate }}</span>
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">报刊单价：</span>
                    <span>{{ item.originalPrice }}</span>
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">每期数量：</span>
                    <span>{{ item.backNumber }}</span>
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">退订期数：</span>
                    <span>{{ item.backCycleNum }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              退订金额：<span class="price-main font16 bold-font">{{
                item.backPrice.toFixed(2)
              }}</span>
            </div>
          </div>
          <!-- <el-divider></el-divider> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { refundList, cancelBack, delBack } from "@/api/order";
import msgBox from "./msg.vue";
export default {
  name: "mycard",
  components: {
    msgBox
  },
  data() {
    return {
      backList: []
    };
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
      refundList(data).then(res => {
        if (res.code == 200) {
          this.backList = res.data.records;
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
    },
    cancelFun(id) {
      cancelBack({ backOrderId: id }).then(res => {
        if (res.code == 200) {
          this.getData();
        } else {
          this.$refs.tips.toast(res.msg);
        }
      });
    },
    delFun(id) {
      delBack({ backOrderId: id }).then(res => {
        if (res.code == 200) {
          this.getData();
        } else {
          this.$refs.tips.toast(res.msg);
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
.back-status {
  width: 100%;
}
</style>
