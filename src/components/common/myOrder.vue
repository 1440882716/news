<template>
  <div class="my-info">
    <msgBox ref="tips"></msgBox>

    <div class="info-content">
      <el-tabs v-model="editableTabsValue" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>

      <div class="my-info-box" v-if="orderData.length == 0">
        <div class="font16 tips-color no-card-text">
          您暂时还没有订单哦~
        </div>
      </div>

      <div v-else>
        <div
          class="order-item-box font14 m-b-20"
          v-for="(item, index) in orderData"
          :key="index"
        >
          <div class="flex-r flex-b order-head-box">
            <div>
              <span>{{ item.createTime }}</span>
              <span class="m-l-10">收货人：{{ item.name }}</span>
            </div>
            <div class="flex-r">
              <count-down
                v-if="item.orderStatus == 0"
                :endTime="item.end_time"
                :callback="callback"
                endText=""
              ></count-down>

              <div
                class="handle-btn m-r-10 m-l-10 pointer"
                v-if="item.orderStatus == 0"
              >
                立即支付
              </div>
              <div
                class="handle-btn pointer"
                @click="cancelFun(item.id)"
                v-if="item.orderStatus == 0 && item.payStatus == 0"
              >
                取消订单
              </div>
              <div
                class="handle-btn pointer"
                @click="delFun(item.id)"
                v-if="item.orderStatus == 1 || item.orderStatus == 5"
              >
                删除订单
              </div>
            </div>
          </div>
          <div class="flex-r order-count font12">
            <span class="m-r-20">订单号：{{ item.id }}</span>
            <span>订单总额：{{ item.totalPrice }}</span>
          </div>
          <div
            class="flex-r flex-b order-goods-item-box"
            v-for="info in item.goods"
          >
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
                  <p class="font16  main-color">{{ info.name }}</p>
                  <p style="text-align: left;">
                    <span class="justify">起止日期：</span>
                    <span>{{ info.startDate }}~{{ info.endDate }}</span>
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">期数：</span>
                    <span>{{ info.cycleNum }}</span>
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">数量：</span>
                    <span>{{ info.number }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              金额：<span class="price-main font16 bold-font">{{
                info.realPrice * info.number
              }}</span>
            </div>
          </div>
          <!-- <el-divider></el-divider> -->
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="orderCount"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { orderList, orderDetail, orderCancel, orderDel } from "@/api/order";
import msgBox from "./msg.vue";
// import CountDown from "vue2-countdown";
import CountDown from "./countDown.vue";
export default {
  name: "myorder",
  components: {
    msgBox,
    CountDown
  },
  data() {
    return {
      statusNum: "0",
      orderNum: "",
      currentPage: 1,
      orderCount: 0,
      editableTabsValue: "0",
      editableTabs: [
        {
          title: "全部订单",
          name: "0"
        },
        {
          title: "待付款",
          name: "1"
        },
        {
          title: "待发货",
          name: "2"
        },
        {
          title: "订阅中",
          name: "3"
        },
        {
          title: "已完成",
          name: "4"
        },
        {
          title: "已取消",
          name: "5"
        }
      ],
      orderData: [],

      currentTime: 0,
      startTime: 1646977570000,
      endTime: "1647315805"
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getTimestamp(time) {
      //把时间日期转成时间戳
      return new Date(time).getTime();
    },
    getData() {
      let data = {
        current: this.currentPage,
        status: this.statusNum
      };
      orderList(data).then(res => {
        if (res.code == 200) {
          this.orderData = res.data.records;
          this.orderCount = res.data.total;
          this.orderData.map(item => {
            let start = this.getTimestamp(item.createTime);
            let lastTime = (start + 24 * 60 * 60 * 1000) / 1000;
            lastTime = String(lastTime);
            this.$set(item, "end_time", lastTime);
          });
        } else {
        }
      });
    },
    handleClick() {
      console.log(this.editableTabsValue);
      this.statusNum = this.editableTabsValue;
      this.currentPage = 1;
      this.getData();
      // debugger;
    },
    callback() {},
    orderDetailFun(info) {
      console.log(info);
      this.$router.push({
        path: "/orderDetail",
        name: "orderDetail",
        query: {
          orderId: info.id
        }
      });
      // debugger;
    },
    toGoodsInfo(info) {
      console.log(info);
      debugger;
    },
    handleCurrentChange(val) {
      this.currentPage = val;

      this.getData();
    },
    // 取消订单
    cancelFun(id) {
      orderCancel({ id: id }).then(res => {
        if (res.code == 200) {
          this.$refs.tips.toast(res.msg);
          this.getData();
        }
      });
    },
    // 删除订单
    delFun(id) {
      if (id != "" && id != undefined) {
        orderDel({ id: id }).then(res => {
          if (res.code == 200) {
            this.$refs.tips.toast(res.msg);
            this.getData();
          }
        });
      }
    }
    //  countDown(i) {
    //   let that = this;
    //   let item = that.list[i];
    //   // 计算倒计时
    //   that.list[i].countDownFn = setInterval(() => {
    //     //  console.log(that.countDownFun(item.endTime))
    //     if (that.countDownFun(item.countDownTime) == "倒计时结束") {
    //       clearInterval(that.list[i].countDownFn); //清除定时器
    //     } else {
    //       item.countDownTime = that.countDownFun(item.endTime);
    //       that.$set(
    //         that.list,
    //         item.countDownTime,
    //         that.countDownFun(item.endTime)
    //       );
    //     }
    //   }, 1000);
    // }
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
  /* padding: 20px 15px; */
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
.order-goods-item-box {
  padding: 0px 15px 8px 15px;
}
.order-goods-img {
  width: 80px;
  height: 100px;
}
.justify {
  display: inline-block;
  width: 80px;
  text-align: right;
}
.order-img-box {
  width: 120px;
  height: 100px;
}
.order-count {
  padding: 0 15px 10px 15px;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 10px;
}
</style>
