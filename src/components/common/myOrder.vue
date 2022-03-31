<template>
  <div class="my-info">
    <msgBox ref="tips"></msgBox>
    <!-- 重新支付选择支付方式 -->
    <el-dialog title="支付方式" :visible.sync="dialogVisible" width="30%">
      <!-- <span>支付方式的种类</span> -->
      <div class="flex-r ">
        <div class="pointer m-r-20 text-center" @click="payWay = 1">
          <img
            v-if="payWay == 1"
            class="pay-box"
            src="../../assets/img/wx.png"
            alt=""
          />
          <img
            v-else
            class="pay-box"
            src="../../assets/img/active-wx.png"
            alt=""
          />
          <p>微信</p>
        </div>
        <div class="pointer m-r-20 text-center" @click="payWay = 2">
          <img
            v-if="payWay == 2"
            class="pay-box"
            src="../../assets/img/zfbpay.png"
            alt=""
          />
          <img
            v-else
            class="pay-box"
            src="../../assets/img/active-zfb.png"
            alt=""
          />
          <p class="">支付宝</p>
        </div>
        <div class="pointer m-r-20 text-center" @click="payWayFun(3)">
          <img
            v-if="payWay == 3"
            class="pay-box"
            src="../../assets/img/cardpay.png"
            alt=""
          />
          <img
            v-else
            class="pay-box"
            src="../../assets/img/active-card.png"
            alt=""
          />
          <p>银行卡</p>
        </div>
        <div class="pointer text-center" @click="payWay = 4">
          <img
            v-if="payWay == 4"
            class="pay-box"
            src="../../assets/img/pz.png"
            alt=""
          />
          <img
            v-else
            class="pay-box"
            src="../../assets/img/active-pz.png"
            alt=""
          />
          <p>上传凭证</p>
        </div>
      </div>
      <!-- 银行卡列表 -->
      <div v-show="payWay == 3">
        <div
          class="card-item-box flex-r pointer"
          v-for="(item, index) in cardData"
          @click="chooseBank(item, index)"
        >
          <div class="type-img-box">
            <img class="type-img" src="../../assets/img/cardpay.png" alt="" />
            <div class="tips-color">银行卡</div>
          </div>

          <div class="card-info font12">
            <div class="flex-r text-center m-t-20">
              <div class="tips-color card-name-box">姓名：</div>
              <span>{{ item.name }}</span>
            </div>
            <div class="flex-r text-center">
              <div class="tips-color card-name-box">银行卡号：</div>
              <span>{{ item.cardNumber }}</span>
            </div>
            <div class="flex-r text-center">
              <div class="tips-color card-name-box">银行：</div>
              <span>{{ item.bankName }}</span>
            </div>
          </div>
          <div class="handle-box text-center">
            <i
              :class="[
                'el-icon-success',
                'font24',
                bankInd == index ? 'myActiveColor' : 'f999'
              ]"
            ></i>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="payAgain">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 发票信息 -->
    <el-dialog title="发票信息" :visible.sync="invoiceDialog" width="40%">
      <!-- 当前发票信息 -->
      <div class="text-right pointer" @click="innerVisible = true">
        选择其他发票
      </div>
      <el-form ref="invoiceForm" :model="invoiceForm" label-width="100px">
        <el-form-item label="开票类型" style="text-align: left;">
          <el-radio-group v-model="invoiceForm.status">
            <el-radio disabled :label="1">个人</el-radio>
            <el-radio disabled :label="2">公司</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="公司/个人名称">
          <el-input v-model="invoiceForm.name"></el-input>
        </el-form-item>
        <el-form-item label="税号" v-if="invoiceForm.status == 2">
          <el-input v-model="invoiceForm.taxNo"></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input :disabled="true" v-model="invoiceForm.money"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" v-if="invoiceForm.status == 2">
          <el-input v-model="invoiceForm.companyAddress"></el-input>
        </el-form-item>
        <el-form-item label="公司电话" v-if="invoiceForm.status == 2">
          <el-input v-model="invoiceForm.companyMobile"></el-input>
        </el-form-item>
        <el-form-item label="开户行名称" v-if="invoiceForm.status == 2">
          <el-input v-model="invoiceForm.bankName"></el-input>
        </el-form-item>
        <el-form-item label="开户行卡号" v-if="invoiceForm.status == 2">
          <el-input v-model="invoiceForm.bankCard"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="invoiceForm.email"></el-input>
        </el-form-item>
      </el-form>
      <!-- 内层嵌套的dialog -->
      <el-dialog
        width="30%"
        title="内层 Dialog"
        :visible.sync="innerVisible"
        append-to-body
      >
        <div>发票列表</div>
        <div
          class="card-item-box flex-r pointer"
          v-for="item in invoiceData"
          @click="chooseInvoiceItem(item)"
        >
          <div class="type-img-box" v-if="item.type == 1">
            <img class="type-img" src="../../assets/img/people3.png" alt="" />
            <div class="tips-color">个人发票</div>
          </div>
          <div class="type-img-box" v-if="item.type == 2">
            <img class="type-img" src="../../assets/img/conpany.png" alt="" />
            <div class="tips-color">公司发票</div>
          </div>
          <div class="card-info font12">
            <div class="flex-r text-center m-t-20">
              <div class="tips-color card-name-box">发票抬头：</div>
              <span>{{ item.name }}</span>
            </div>
            <div class="flex-r text-center" v-if="item.type == 2">
              <div class="tips-color card-name-box">单位税号：</div>
              <span>{{ item.taxNo }}</span>
            </div>
          </div>
        </div>
      </el-dialog>
      <div class="invoice-tips-box text-left">
        <p>提示</p>
        <p>
          1. 每张发票上限金额为1万元，若开票总金额超过1万元，将开具多张发票。
        </p>
        <p>2. 两种报刊类型将分开开具发票。</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="invoiceDialog = false">取 消</el-button>
        <el-button type="primary" @click="getInvoice">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 退订信息 -->
    <el-dialog title="退订信息" :visible.sync="backOrder" width="30%">
      <!-- <div class="text-center">退订信息</div> -->
      <div class="flex-r">
        <img class="back-img-size" :src="backInfo.pics" alt="" />
        <div class="text-left m-l-30">
          <div>报刊名称：{{ backInfo.name }}</div>
          <div>已订期数：{{ backInfo.backDate }}</div>
          <div>每期数量：{{ backInfo.backNumber }}</div>
          <div>退订期数：{{ backInfo.backCycleName }}</div>
          <div>退订时间：{{ backInfo.backDate }}</div>
          <div>可退金额：{{ backInfo.backPrice }}</div>
        </div>
      </div>

      <div class="flex-r m-t-30">
        <div class="backreason-title">退订原因：</div>
        <el-input
          v-model="backReason"
          type="textarea"
          placeholder="请输入退订原因"
        ></el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="backOrder = false">取 消</el-button>
        <el-button type="primary" @click="backFun">确 定</el-button>
      </span>
    </el-dialog>

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
        <!-- 已完成的订单开发票 -->
        <div class="flex flex-e">
          <el-button
            type="primary"
            v-if="statusNum == '4'"
            @click="chooseInvoiceFun"
            class="text-right pointer invoice-btn m-b-10"
          >
            开发票
          </el-button>
        </div>

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
                v-if="item.orderStatus == 0 && item.payWay != 4"
                :endTime="item.end_time"
                :callback="callback"
                endText=""
              ></count-down>

              <div
                class="handle-btn m-r-10 m-l-10 pointer"
                @click="payFun(item)"
                v-if="item.orderStatus == 0"
              >
                立即支付
              </div>
              <div
                class="handle-btn pointer"
                @click="cancelFun(item.id)"
                v-if="item.orderStatus == 0"
              >
                取消订单
              </div>
              <div
                class="handle-btn pointer"
                @click="backNews(item.id, item.goods.paperId)"
                v-if="item.orderStatus == 4"
              >
                退订
              </div>
              <div
                class="handle-btn pointer"
                @click="delFun(item.id)"
                v-if="item.orderStatus == 1 || item.orderStatus == 5"
              >
                删除订单
              </div>
              <div
                class=" pointer"
                @click="delFun(item.id)"
                v-if="item.payWay == 4 && item.auditStatus == 0"
              >
                上传凭证审核中
              </div>
              <div
                class=" pointer"
                v-if="item.payWay == 4 && item.auditStatus == 2"
              >
                上传凭证审核中
              </div>
            </div>
          </div>
          <div class="flex-r flex-b order-count font12">
            <div class="flex-r flex-b box100">
              <div>
                <span class="m-r-20">订单号：{{ item.id }}</span>
                <span>订单总额：{{ item.totalPrice }}</span>
              </div>
              <div>
                <span>{{ item.orderStatusName }}</span>
                <i
                  @click="chooseOrder(item)"
                  v-if="item.isBill == false && statusNum == '4'"
                  :class="[
                    'el-icon-success',
                    'font18',
                    'pointer',
                    item.select ? 'price-color' : 'f999'
                  ]"
                  >是否开发票</i
                >
                <span
                  class="f999"
                  v-if="item.isBill == true && statusNum == '4'"
                  >已开具发票</span
                >
              </div>
            </div>
          </div>
          <div class="flex-r flex-b order-goods-item-box">
            <div class="flex-r">
              <div
                class="order-img-box pointer"
                @click="toGoodsInfo(item.goods.paperId)"
              >
                <img class="order-goods-img" :src="item.goods.pics" alt="" />
              </div>
              <div class="flex-r pointer" @click="orderDetailFun(item)">
                <div class="font14 f999 flex-c">
                  <p class="font16  main-color">{{ item.goods.name }}</p>
                  <p style="text-align: left;">
                    <span class="justify">起止日期：</span>
                    <span
                      >{{ item.goods.startDate }}~{{ item.goods.endDate }}</span
                    >
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">期数：</span>
                    <span>{{ item.goods.cycleNum }}</span>
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">数量：</span>
                    <span>{{ item.goods.number }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              金额：<span class="price-main font16 bold-font">{{
                (item.goods.realPrice * item.goods.number).toFixed(2)
              }}</span>
            </div>
          </div>
          <!-- <el-divider></el-divider> -->
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="orderCount"
          :page-size="size"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {
  orderList,
  orderCancel,
  orderDel,
  reckonOther,
  applyRefund
} from "@/api/order";
import { pageData, handupInvoice } from "@/api/invoice";
import { cardList } from "@/api/card";
import { setOrList, getOrList } from "@/utils/auth";
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
      listtest: [1, 2, 3, 4, 5, 6],
      dialogVisible: false,
      invoiceDialog: false,
      innerVisible: false, //内层嵌套的dialog
      backOrder: false, //退订信息的弹框
      backInfo: {}, //退订期数信息
      backReason: "", //退订原因
      backOrderId: "",
      backNewsId: "",
      statusNum: "0",
      orderNum: "",
      currentPage: 1,
      orderCount: 0,
      editableTabsValue: "0",
      payId: "",
      payWay: -1, //支付方式
      cardData: [], //银行卡列表
      companyType: "", //发票类型
      // isOver: false, //控制开发票的选择
      invoiceOrder: [],
      bankId: "",
      bankInd: -1,
      editableTabs: [
        {
          title: "全部订单",
          name: "0"
        },
        // {
        //   title: "待付款",
        //   name: "1"
        // },
        // {
        //   title: "待发货",
        //   name: "2"
        // },
        {
          title: "订阅中",
          name: "3"
        },
        {
          title: "已完成",
          name: "4"
        }
        // {
        //   title: "已取消",
        //   name: "5"
        // }
      ],
      invoiceForm: {
        status: "",
        name: "",
        taxNo: "",
        money: "",
        companyAddress: "",
        companyMobile: "",
        bankName: "",
        bankCard: "",
        email: ""
      },
      orderData: [],
      invoiceData: [],
      invoiceItem: {},
      currentTime: 0,
      startTime: 0,
      endTime: "",
      size: 10,
      idArr: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 发票信息
    chooseInvoiceFun() {
      let goodsCount = 0;
      for (let i = 0; i < this.invoiceOrder.length; i++) {
        goodsCount += this.invoiceOrder[i].totalPrice;
        this.idArr.push(this.invoiceOrder[i].id);
      }
      console.log(goodsCount);
      // debugger;
      // return;
      // 选中发票开具发票
      if (this.invoiceOrder.length != 0) {
        this.invoiceDialog = true;
        pageData().then(res => {
          if (res.code == 200) {
            this.invoiceData = res.data;
            for (let i = 0; i < this.invoiceData.length; i++) {
              if (this.invoiceData[i].isDefault) {
                // debugger;
                this.invoiceForm.ordersId = this.idArr.join(",");
                this.invoiceForm.status = this.invoiceData[i].type;
                this.invoiceForm.name = this.invoiceData[i].name;
                this.invoiceForm.taxNo = this.invoiceData[i].taxNo;
                this.invoiceForm.money = goodsCount.toFixed(2);
                this.invoiceForm.companyAddress = this.invoiceData[
                  i
                ].companyAddress;
                this.invoiceForm.companyMobile = this.invoiceData[
                  i
                ].companyMobile;
                this.invoiceForm.bankName = this.invoiceData[i].bankName;
                this.invoiceForm.bankCard = this.invoiceData[i].bankCard;
                // this.invoiceForm.email = ""
              }
            }
          }
        });
      } else {
        this.$refs.tips.toast("请选择要开发票的订单");
      }
    },
    // 重新选择发票信息
    chooseInvoiceItem(info) {
      this.invoiceForm.status = info.type;
      this.invoiceForm.name = info.name;
      this.invoiceForm.taxNo = info.taxNo;
      // this.invoiceForm.money = goodsCount.toFixed(2);
      this.invoiceForm.companyAddress = info.companyAddress;
      this.invoiceForm.companyMobile = info.companyMobile;
      this.invoiceForm.bankName = info.bankName;
      this.invoiceForm.bankCard = info.bankCard;
      this.innerVisible = false;
    },
    // 提交发票信息
    getInvoice() {
      console.log(this.invoiceForm);
      // debugger;
      // return;
      handupInvoice(this.invoiceForm).then(res => {
        if (res.code == 200) {
          this.$refs.tips.toast(res.msg);
        } else {
          this.$refs.tips.toast(res.msg);
        }
        this.invoiceDialog = false;
      });
      // debugger;

      // if (this.invoiceForm.status == 1) {
      //   // 开个人发票
      // } else if (this.invoiceForm.status == 2) {
      //   // 开公司发票
      // }
    },
    //把时间日期转成时间戳
    getTimestamp(time) {
      return new Date(time).getTime();
    },
    // 订单列表
    getData() {
      let data = {
        current: this.currentPage,
        status: this.statusNum,
        size: this.size
      };
      orderList(data).then(res => {
        if (res.code == 200) {
          this.orderData = res.data.records;
          this.orderCount = res.data.total;
          if (this.statusNum == "0" || this.statusNum == "1") {
            this.orderData.map(item => {
              let start = this.getTimestamp(item.createTime);
              let lastTime = (start + 24 * 60 * 60 * 1000) / 1000;
              lastTime = String(lastTime);
              this.$set(item, "end_time", lastTime);
            });
          }
          if (this.statusNum == "4") {
            this.orderData.map(item => {
              this.$set(item, "select", false);
            });
          }
        } else {
          this.$refs.tips.toast(res.msg);
        }
      });
    },
    // 切换订单类型
    handleClick() {
      this.statusNum = this.editableTabsValue;
      this.currentPage = 1;
      this.getData();
    },
    callback() {},
    // 查看订单详情
    orderDetailFun(info) {
      let rotuetURl = this.$router.resolve({
        path: "/orderDetail",
        query: { orderId: info.id }
      });
      window.open(rotuetURl.href, "_blank");
    },
    // 去商品详情
    toGoodsInfo(id) {
      this.$router.push({
        path: "/details",
        name: "details",
        query: {
          goodsId: id
        }
      });
    },
    // 改变页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
      // console.log(this.idArr);
    },
    // getInvoiceList() {
    //   cardList().then(res => {
    //     if (res.code == 200) {
    //       this.cardData = res.data;
    //       this.innerVisible = true;
    //     } else {
    //     }
    //   });
    // },
    // 银行卡列表
    payWayFun(num) {
      this.payWay = num;
      cardList().then(res => {
        if (res.code == 200) {
          this.cardData = res.data;
        } else {
        }
      });
    },
    //选择银行卡
    chooseBank(info, ind) {
      this.bankInd = ind;
      this.bankId = info.id;
      // debugger;
    },
    // 立即支付
    payAgain() {
      console.log(this.payId);
      console.log(this.payWay);
      // debugger;
      // return;
      this.$router.push({
        path: "/pay",
        name: "pay",
        query: {
          orderId: this.payId,
          payWay: this.payWay
        }
      });
    },
    // 支付按钮
    payFun(info) {
      this.dialogVisible = true;
      this.payId = info.id;
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
    // 退订信息
    backNews(id, newsId) {
      this.backOrderId = id;
      this.backNewsId = newsId;
      reckonOther({ orderId: id, newspaperId: newsId }).then(res => {
        if (res.code == 200) {
          this.backInfo = res.data;
          this.backOrder = true;
        } else {
          this.$refs.tips.toast(res.msg);
        }
      });
    },
    // 退订
    backFun() {
      applyRefund({
        orderId: this.backOrderId,
        newspaperId: this.backNewsId,
        reason: this.backReason
      }).then(res => {
        if (res.code == 200) {
          this.$refs.tips.toast(res.msg);
          this.backOrder = false;
          this.getData();
        } else {
          this.$refs.tips.toast(res.msg);
        }
      });
    },
    // 删除订单
    delFun(id) {
      if (id != "" && id != undefined) {
        this.$confirm("您确定要删除订单吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            orderDel({ id: id }).then(res => {
              if (res.code == 200) {
                this.$refs.tips.toast(res.msg);
                this.getData();
              } else {
                this.$refs.tips.toast(res.msg);
              }
            });
          })
          .catch(() => {});
      }
    },
    // 选择订单
    chooseOrder(info) {
      console.log(info);
      info.select = !info.select;
      this.invoiceOrder = this.orderData.filter(item => {
        return item.select;
      });
      console.log(this.invoiceOrder);
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
.pay-box {
  width: 60px;
  height: 60px;
}
.pay-box-card {
  width: 70px;
  height: 60px;
}
/* =================银行卡列表 */
.card-item-box {
  width: 100%;
  height: 120px;
  border: 1px solid #e5e5e5;
  margin-top: 20px;
}
.type-img-box {
  width: 200px;
  height: 100%;
  /* line-height: 120px; */
  text-align: center;
  background-color: #edffff;
}
.type-img {
  width: 54px;
  height: 50px;
  margin-top: 35px;
}
.card-info {
  width: calc(100% - 300px);
  height: 100%;
  text-align: center;
  /* background-color: darkgoldenrod; */
}
.card-name-box {
  width: 120px;
  text-align: right;
  margin-bottom: 10px;
}
.handle-box {
  width: 150px;
  height: 120px;
  /* height: 100%; */
  line-height: 120px;
  /* background-color: salmon; */
}
.card-item-box {
  width: 100%;
  height: 120px;
  border: 1px solid #e5e5e5;
  margin-top: 20px;
}
.type-img-box {
  width: 150px;
  height: 100%;
  /* line-height: 120px; */
  text-align: center;
  background-color: #edffff;
  position: relative;
}
.type-img {
  width: 54px;
  height: 50px;
  margin-top: 35px;
}
.card-info {
  width: calc(100% - 200px);
  height: 100%;
  text-align: center;
  /* background-color: darkgoldenrod; */
}
.invoice-tips-box {
  /* width: 100%; */
  padding: 10px 20px;
  background-color: antiquewhite;
}
.back-img-size {
  width: 80px;
  height: 100px;
}
.backreason-title {
  width: 100px;
  /* margin-top: 40px; */
}
</style>
