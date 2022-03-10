<template>
  <div class="my-info">
    <msgBox ref="tips"></msgBox>

    <div class="info-content">
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待付款" name="one">待付款</el-tab-pane>
        <el-tab-pane label="待发货" name="two">待发货</el-tab-pane>
        <el-tab-pane label="待收货" name="three">待收货</el-tab-pane>
        <el-tab-pane label="订阅中" name="four">订阅中</el-tab-pane>
        <el-tab-pane label="已完成" name="five">已完成</el-tab-pane>
        <el-tab-pane label="已退订" name="six">已退订</el-tab-pane>
      </el-tabs> -->
      <el-tabs v-model="editableTabsValue" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          <!-- {{ item.content }} -->
        </el-tab-pane>
      </el-tabs>
      <!-- <el-input
        size="small"
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        v-model="orderNum"
      >
      </el-input> -->
      <!-- <div class="title-box flex-r flex-b">
        <div class="my-info-title">
          全部订单
        </div>
        <div class="top-add-box font14 pointer">
          查询
        </div>
      </div> -->
      <div class="my-info-box">
        <div class="font16 tips-color no-card-text">
          您暂时还没有订单哦~
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { orderList, orderDetail, orderCancel, orderDel } from "@/api/order";
import msgBox from "./msg.vue";
export default {
  name: "myorder",
  components: {
    msgBox
  },
  data() {
    return {
      orderNum: "",
      editableTabsValue: 0,
      editableTabs: [
        {
          title: "全部订单",
          name: 0
        },
        {
          title: "待付款",
          name: 1
        },
        {
          title: "待发货",
          name: 2
        },
        {
          title: "订阅中",
          name: 3
        },
        {
          title: "已完成",
          name: 4
        },
        {
          title: "已取消",
          name: 5
        }
      ],
      tabIndex: 2
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      orderList().then(res => {
        if (res.code == 200) {
        }
      });
    },
    handleClick() {
      console.log(this.editableTabsValue);
      //   debugger;
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
</style>
