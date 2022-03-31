<template>
  <div class="my-info">
    <msgBox ref="tips"></msgBox>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div class="m-b-20 text-center">查询发票成功!</div>
      <el-form label-width="100px" :model="form" ref="form">
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change']
            }
          ]"
        >
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="downPDF(pdfUrl)">立即下载</el-button>
        <el-button type="primary" @click="postEmail">发送到邮箱</el-button>
      </span>
    </el-dialog>
    <div class="info-content">
      <el-tabs v-model="editableTabsValue">
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
          您暂时还没有发票订单哦~
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
              <span class="m-l-10">收货人：{{ item.userName }}</span>
            </div>
            <div class="flex-r">
              <div
                class="handle-btn m-l-10 pointer"
                @click="delInvoice(item.id)"
              >
                删除
              </div>
              <div
                v-if="item.status == 1"
                class="handle-btn m-l-10 pointer"
                @click="queryData(item.id)"
              >
                查询
              </div>
              <div
                v-if="item.status == 2"
                class="handle-btn m-l-10 pointer"
                @click="downPDF(item.pdfUrl)"
              >
                下载发票
              </div>
              <div
                v-if="item.status == 3"
                class="handle-btn m-l-10 pointer"
                @click="reInvoice(item.id)"
              >
                重新开票
              </div>
              <div
                v-if="item.status == 2"
                class="handle-btn m-l-10 pointer"
                @click="openEmail(item)"
              >
                发送到邮箱
              </div>
            </div>
          </div>
          <div class="flex-r flex-b order-count font12">
            <div class="flex-r">
              <span class="m-r-20">订单号：{{ item.id }}</span>
              <div>
                订单总额：<span class="font14 price-color">{{
                  item.totalPrices
                }}</span>
              </div>
            </div>
            <div v-if="item.status == 1">开票中</div>
            <div v-if="item.status == 2">开票完成</div>
            <div v-if="item.status == 3">开票失败</div>
          </div>
          <div class="flex-r flex-b order-goods-item-box">
            <div class="flex-r">
              <div class="flex-r pointer">
                <div class="font14  flex-c">
                  <p style="text-align: left;">
                    <span class="justify">创建时间：</span>
                    <span>{{ item.createTime }}</span>
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">开票类型：</span>
                    <span>{{ item.invoiceTypeName }}</span>
                  </p>
                  <p style="text-align: left;">
                    <span class="justify">发票抬头：</span>
                    <span>{{ item.invoice }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div>商品：{{ item.commodityName }}</div>
            <!-- <div>下载发票</div> -->
          </div>
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
import msgBox from "./msg.vue";
import CountDown from "./countDown.vue";
import {
  invoiceList,
  delInvoiceList,
  query,
  reopen,
  toEmail
} from "@/api/invoice";
export default {
  name: "myorder",
  components: {
    msgBox,
    CountDown
  },
  data() {
    return {
      dialogVisible: false,
      statusNum: "0",
      orderNum: "",
      currentPage: 1,
      orderCount: 0,
      editableTabsValue: "0",
      editableTabs: [
        {
          title: "我的发票",
          name: "0"
        }
      ],
      orderData: [],
      reQuest: "",
      pdfUrl: "",
      form: {
        email: ""
      },
      getPage: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 发票订单列表
    getData() {
      let data = {
        current: this.currentPage,
        status: this.statusNum
      };
      invoiceList(data).then(res => {
        if (res.code == 200) {
          this.orderData = res.data.records;
          this.orderCount = res.data.total;
        } else {
          this.$refs.tips.toast(res.msg);
        }
      });
    },
    // 删除发票
    delInvoice(id) {
      delInvoiceList({ id: id }).then(res => {
        if (res.code == 200) {
          this.$refs.tips.toast(res.msg);
          this.getData();
        } else {
          this.$refs.tips.toast(res.msg);
        }
      });
    },
    // 重新开票
    reInvoice(id) {
      reopen({ id: id }).then(res => {
        if (res.code == 200) {
        } else {
          this.$refs.tips.toast(res.msg);
        }
      });
    },
    // 查询开票结果
    queryData(id) {
      this.getPage = id;
      query({ id: id }).then(res => {
        if (res.code == 200) {
          if (res.data != null) {
            this.dialogVisible = true;
            this.pdfUrl = res.data;
          }
          this.getData();
        } else {
          // debugger;
          this.$refs.tips.toast(res.msg);
        }
      });
    },
    // 下载发票
    downPDF(pfdLink) {
      this.pdfUrl = pfdLink;
      window.open(this.pdfUrl, "_blank");
      this.dialogVisible = false;
    },
    openEmail(info) {
      this.dialogVisible = true;
      this.getPage = info.id;
    },
    // 将发票发送到邮箱
    postEmail() {
      this.$refs.form.validate(valid => {
        if (valid) {
          toEmail({ id: this.getPage, email: this.form.email }).then(res => {
            if (res.code == 200) {
              this.$refs.tips.toast(res.msg);
              this.dialogVisible = false;
            } else {
              this.$refs.tips.toast(res.msg);
            }
          });
        }
      });
    },
    // 改变页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
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
  /* width: 70px; */
  padding: 0px 10px;
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
</style>
