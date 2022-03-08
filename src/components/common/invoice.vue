<template>
  <div class="my-info">
    <msgBox ref="tips"></msgBox>
    <el-dialog
      title="新增发票抬头"
      :visible.sync="dialogVisible"
      @close="closeDialog"
      width="40%"
    >
      <div class="font14 dialog-content">
        <el-form
          label-width="80px"
          :model="accountForm"
          :rules="accountRules"
          ref="accountForm"
        >
          <el-form-item label="发票类型">
            <div class="invoice-type-box primary-color">普通发票</div>
          </el-form-item>
          <el-form-item label="抬头类型">
            <div class="flex-r">
              <div
                :class="[
                  'invoice-type',
                  'pointer',
                  typeNum == 1 ? 'active-type' : ''
                ]"
                @click="typeNum = 1"
              >
                个人
              </div>
              <div
                :class="[
                  'invoice-type',
                  'pointer',
                  typeNum == 2 ? 'active-type' : ''
                ]"
                @click="typeNum = 2"
              >
                公司
              </div>
            </div>
          </el-form-item>
          <el-form-item label="发票抬头" prop="invoice">
            <el-input
              v-model="accountForm.invoice"
              placeholder="请填写发票抬头"
              type="text"
            ></el-input>
          </el-form-item>

          <el-form-item label="单位税号" prop="company" v-show="typeNum == 2">
            <el-input
              v-model="accountForm.company"
              type="text"
              placeholder="请填写单位税号"
            ></el-input>
          </el-form-item>
          <el-form-item label="注册地址" prop="bankName" v-show="typeNum == 2">
            <el-input
              v-model="accountForm.bankName"
              type="text"
              placeholder="请填写注册地址（选填）"
            ></el-input>
          </el-form-item>
          <el-form-item label="注册电话" prop="bankName" v-show="typeNum == 2">
            <el-input
              v-model="accountForm.bankName"
              type="text"
              placeholder="请填写注册电话（选填）"
            ></el-input>
          </el-form-item>
          <el-form-item label="开户银行" prop="branch" v-show="typeNum == 2">
            <el-input
              v-model="accountForm.branch"
              placeholder="请输入开户银行（选填）"
              type="text"
            ></el-input>
          </el-form-item>
          <el-form-item label="银行账号" prop="branch" v-show="typeNum == 2">
            <el-input
              v-model="accountForm.branch"
              placeholder="请输入银行账号（选填）"
              type="text"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="add-card-btn fff-font pointer" @click="addCardFun">
        <span>完成</span>
      </div>

      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>
    <div class="info-content text-left">
      <div class="title-box flex-r flex-b">
        <div class="my-info-title">
          发票抬头
        </div>
        <div class="top-add-box font14 pointer" @click="dialogVisible = true">
          新增
        </div>
      </div>
      <div class="my-info-box" v-if="invoiceList.length == 0">
        <div class="font16 tips-color no-card-text">
          你还没有发票抬头哦！
        </div>
        <div class="add-btn-box flex-r pointer" @click="dialogVisible = true">
          <div>
            <img class="add-icon" src="../../assets/img/add.png" alt="" />
          </div>
          <span>新增发票抬头</span>
        </div>
      </div>
      <div class="my-card-box" v-else>
        <div class="card-item-box flex-r" v-for="item in invoiceList">
          <!-- <div class="type-img-box" v-if="item.type == 1">
            <img class="type-img" src="../../assets/img/zfb.png" alt="" />
            <div class="tips-color">支付宝</div>
          </div> -->
          <div class="type-img-box">
            <img class="type-img" src="../../assets/img/bank.png" alt="" />
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
          <div class="handle-box flex-r flex-e">
            <div class="handle-icon-box1 pointer" @click="changeAccount(item)">
              <img
                class="handle-icon1"
                src="../../assets/img/pencil.png"
                alt=""
              />
            </div>
            <div class="handle-icon-box2 pointer" @click="delAccount(item)">
              <img
                class="handle-icon2"
                src="../../assets/img/trash.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import city from "../../assets/data/area_format_city.json";
// import { addCard, updCard, delCard, cardList } from "@/api/card";
import msgBox from "./msg.vue";
export default {
  name: "mycard",
  components: {
    msgBox
  },
  data() {
    return {
      dialogVisible: false,
      typeNum: 1,
      invoiceList: [
        // { id: 1, name: "徐然", account: "1341235351245", type: 1 },
        // {
        //   id: 2,
        //   type: 2,
        //   name: "官官",
        //   account: "621700575509687565645674",
        //   bank: "建设银行",
        //   bankRegion: "",
        //   bankItem: "冠城广场支行"
        // }
      ],
      accountForm: {
        typeNum: 1,
        invoice: "",
        company: "",
        address: "",
        phone: "",
        bank: "",
        bankName: ""
      },
      accountRules: {
        invoice: [
          { required: true, message: "开户人姓名不能为空", trigger: "blur" }
        ],
        company: [
          { required: true, message: "开户银行不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      cardList().then(res => {
        if (res.code == 200) {
          this.invoiceList = res.data;
        }
      });
    },
    //   关闭弹窗后清除表单内容
    closeDialog() {
      this.$nextTick(() => {
        this.accountForm.name = "";
        this.accountForm.cardNumber = "";
        this.accountForm.bankName = "";
        this.accountForm.bankRegion = [];
        this.accountForm.branch = "";
        this.$refs.accountForm.clearValidate();
      });
    },

    // 修改银行卡信息
    changeAccount(info) {
      // debugger;
      let arr = [info.province, info.city];
      this.accountForm.id = info.id;
      this.accountForm.name = info.name;
      this.accountForm.cardNumber = info.cardNumber;
      this.accountForm.bankName = info.bankName;
      this.accountForm.bankRegion = arr;
      this.accountForm.branch = info.branch;
      this.dialogVisible = true;
      // console.log(this.accountForm);
      // debugger;
    },
    // 添加银行卡
    addCardFun() {
      this.$refs.accountForm.validate(valid => {
        if (valid) {
          this.accountForm.province = this.accountForm.bankRegion[0];
          this.accountForm.city = this.accountForm.bankRegion[1];
          if (this.accountForm.hasOwnProperty("id")) {
            updCard(this.accountForm).then(res => {
              if (res.code == 200) {
                this.dialogVisible = false;
                this.getData();
              } else {
                this.$refs.tips.toast(res.msg);
              }
            });
          } else {
            addCard(this.accountForm).then(res => {
              if (res.code == 200) {
                this.dialogVisible = false;
                this.getData();
              } else {
                this.$refs.tips.toast(res.msg);
              }
            });
          }
        }
      });
    },
    // 删除支付宝/银行卡
    delAccount(info) {
      this.$confirm("确定要删除该地址吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delCard({ id: info.id }).then(res => {
            if (res.code == 200) {
              this.getData();
            } else {
              this.$refs.tips.toast(res.msg);
            }
          });
        })
        .catch(() => {});
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
.info-container {
  padding: 15px 20px;
}
.no-card-text {
  /* margin-top: 250px; */
}
.add-btn-box {
  width: 165px;
  height: 40px;
  margin: 0 auto;
  padding: 0 30px;
  text-align: center;
  line-height: 40px;
  border: 1px solid #2970c1;
  color: #2970c1;
  margin-top: 300px;
}
.add-icon {
  width: 20px;
  height: 20px;
  margin-top: 10px;
  margin-right: 5px;
}
.dialog-content {
  padding: 0px 30px;
}
.tips-box {
  background: rgb(255, 250, 233);
  border-radius: 2px;
  /* width: 100%; */
  height: auto;
  line-height: 25px;
  margin-bottom: 30px;
  color: rgb(186, 159, 109);
  padding: 10px;
  margin-top: 40px;
}
.el-form-item {
  margin-bottom: 30px;
}
.add-card-btn {
  width: 300px;
  height: 40px;
  margin: 0 auto;
  margin-top: 80px;
  line-height: 40px;
  text-align: center;
  background-image: linear-gradient(
    90deg,
    #1058ac 0%,
    #2269bb 23%,
    #2f75c5 56%,
    #498ddc 85%,
    #409eff 100%
  );
}
.el-input__inner {
  /* height: 40px; */
}
.my-card-box {
  /* border: 1px solid #e5e5e5; */
}
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
.handle-box {
  width: 150px;
  height: 100%;
  /* background-color: salmon; */
}
.card-name-box {
  width: 120px;
  text-align: right;
  margin-bottom: 10px;
}
.handle-icon-box1 {
  width: 26px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  margin-top: 47px;
  margin-right: 20px;
  background-color: #5fbaae;
}
.handle-icon-box2 {
  width: 26px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  margin-top: 47px;
  margin-right: 20px;
  background-color: #de6860;
}
.handle-icon1 {
  width: 18px;
  height: 18px;
  margin-top: 4px;
}
.handle-icon2 {
  width: 22px;
  height: 22px;
  margin-top: 2px;
}
.top-add-box {
  padding: 5px 20px;
  color: #fff;
  background-color: #2970c1;
}
.invoice-type-box {
  width: 80px;
  height: 24px;
  line-height: 24px;
  border-radius: 16px;
  border: 1px solid #409eff;
  margin-top: 5px;
  margin-left: 20px;
}
.invoice-type {
  width: 80px;
  height: 24px;
  line-height: 24px;
  border-radius: 16px;
  border: 1px solid #cdcdcd;
  margin-top: 5px;
  margin-left: 20px;
}
.active-type {
  border: 1px solid #409eff;
  color: #409eff;
}
</style>
