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
                  accountForm.type == 1 ? 'active-type' : ''
                ]"
                @click="accountForm.type = 1"
              >
                个人
              </div>
              <div
                :class="[
                  'invoice-type',
                  'pointer',
                  accountForm.type == 2 ? 'active-type' : ''
                ]"
                @click="accountForm.type = 2"
              >
                公司
              </div>
            </div>
          </el-form-item>
          <el-form-item label="发票抬头" prop="name">
            <el-input
              v-model="accountForm.name"
              placeholder="请填写发票抬头"
              type="text"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="单位税号"
            prop="taxNo"
            v-show="accountForm.type == 2"
          >
            <el-input
              v-model="accountForm.taxNo"
              type="text"
              placeholder="请填写单位税号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="注册地址"
            prop="bankName"
            v-show="accountForm.type == 2"
          >
            <el-input
              v-model="accountForm.companyAddress"
              type="text"
              placeholder="请填写注册地址（选填）"
            ></el-input>
          </el-form-item>
          <el-form-item label="注册电话" v-show="accountForm.type == 2">
            <el-input
              v-model="accountForm.companyMobile"
              type="text"
              placeholder="请填写注册电话（选填）"
            ></el-input>
          </el-form-item>
          <el-form-item label="开户银行" v-show="accountForm.type == 2">
            <el-input
              v-model="accountForm.bankName"
              placeholder="请输入开户银行（选填）"
              type="text"
            ></el-input>
          </el-form-item>
          <el-form-item label="银行账号" v-show="accountForm.type == 2">
            <el-input
              v-model="accountForm.bankCard"
              placeholder="请输入银行账号（选填）"
              type="text"
            ></el-input>
          </el-form-item>
          <el-form-item label="默认发票" style="text-align: left;">
            <el-switch v-model="accountForm.isDefault"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <div class="add-card-btn fff-font pointer" @click="addFun">
        <span>完成</span>
      </div>
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
          <div class="type-img-box" v-if="item.type == 1">
            <img
              v-if="item.isDefault"
              class="default-icon"
              src="../../assets/img/default.png"
              alt=""
            />
            <img class="type-img" src="../../assets/img/people3.png" alt="" />
            <div class="tips-color">个人发票</div>
          </div>
          <div class="type-img-box" v-if="item.type == 2">
            <img
              v-if="item.isDefault"
              class="default-icon"
              src="../../assets/img/default.png"
              alt=""
            />
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
import { addInvoice, updInvoice, pageData, delInvoice } from "@/api/invoice";
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
      invoiceList: [],
      accountForm: {
        type: 1,
        name: "",
        taxNo: "",
        companyAddress: "",
        companyMobile: "",
        bankName: "",
        bankCard: "",
        isDefault: false
      },
      accountRules: {
        name: [
          { required: true, message: "发票抬头不能为空", trigger: "blur" }
        ],
        taxNo: [
          { required: true, message: "单位税号不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let data = {
        page: this.page,
        limit: this.limit
      };
      pageData(data).then(res => {
        if (res.code == 200) {
          this.invoiceList = res.data;
        }
      });
    },
    //   关闭弹窗后清除表单内容
    closeDialog() {
      this.$nextTick(() => {
        this.accountForm.type = 1;
        this.accountForm.name = "";
        this.accountForm.taxNo = "";
        this.accountForm.companyAddress = "";
        this.accountForm.companyMobile = "";
        this.accountForm.bankName = "";
        this.accountForm.bankCard = "";
        this.$refs.accountForm.clearValidate();
      });
    },

    // 修改银行卡信息
    changeAccount(info) {
      // debugger;
      this.accountForm.id = info.id;
      if (info.type == 1) {
        this.accountForm.type = info.type;
        this.accountForm.name = info.name;
      } else {
        this.accountForm.type = info.type;
        this.accountForm.name = info.name;
        this.accountForm.taxNo = info.taxNo;
        this.accountForm.companyAddress = info.companyAddress;
        this.accountForm.companyMobile = info.companyMobile;
        this.accountForm.bankName = info.bankName;
        this.accountForm.bankCard = info.bankCard;
      }
      this.dialogVisible = true;
    },
    // 添加银行卡
    addFun() {
      console.log(this.accountForm.type);
      let formType = this.accountForm.type;
      console.log(this.accountForm);
      // debugger;
      // return;
      if (formType == 1) {
        //   个人发票
        this.$refs.accountForm.validateField(["name"], errMsg => {
          if (errMsg) {
          } else {
            if (this.accountForm.hasOwnProperty("id")) {
              updInvoice(this.accountForm).then(res => {
                if (res.code == 200) {
                  this.dialogVisible = false;
                  this.getData();
                } else {
                  this.$refs.tips.toast(res.msg);
                }
              });
            } else {
              addInvoice(this.accountForm).then(res => {
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
      } else {
        //  公司发票
        this.$refs.accountForm.validate(valid => {
          if (valid) {
            if (this.accountForm.hasOwnProperty("id")) {
              updInvoice(this.accountForm).then(res => {
                if (res.code == 200) {
                  this.dialogVisible = false;
                  this.getData();
                } else {
                  this.$refs.tips.toast(res.msg);
                }
              });
            } else {
              addInvoice(this.accountForm).then(res => {
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
      }
      // debugger;
    },
    // 删除支付宝/银行卡
    delAccount(info) {
      this.$confirm("确定要删除这个发票抬头吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delInvoice({ id: info.id }).then(res => {
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
  position: relative;
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
.default-icon {
  position: absolute;
  top: -12px;
  left: -12px;
}
</style>
