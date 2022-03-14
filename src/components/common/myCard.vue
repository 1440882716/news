<template>
  <div class="my-info">
    <msgBox ref="tips"></msgBox>
    <el-dialog
      title="新增账户"
      :visible.sync="dialogVisible"
      @close="closeDialog"
      width="50%"
    >
      <div class="font14 dialog-content">
        <el-form
          label-width="120px"
          :model="accountForm"
          :rules="accountRules"
          ref="accountForm"
        >
          <el-form-item label="用户姓名" prop="name">
            <el-input
              v-model="accountForm.name"
              placeholder="请输入开户人姓名"
              type="text"
            ></el-input>
          </el-form-item>

          <el-form-item label="银行卡号" prop="cardNumber">
            <el-input
              v-model="accountForm.cardNumber"
              type="text"
              placeholder="请输入银行卡号"
            ></el-input>
          </el-form-item>
          <el-form-item label="开户银行" prop="bankName">
            <el-input
              v-model="accountForm.bankName"
              type="text"
              placeholder="请输入银行卡号"
            ></el-input>
          </el-form-item>
          <el-form-item label="开户地" prop="bankRegion">
            <el-cascader
              style="width: 100%;"
              v-model="accountForm.bankRegion"
              :options="cityData"
              :props="{
                // checkStrictly: true,
                expandTrigger: 'hover',
                value: 'id',
                label: 'ext_name',
                children: 'childs'
              }"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="开户支行" prop="branch">
            <el-input
              v-model="accountForm.branch"
              placeholder="请输入开户支行"
              type="text"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="text-left tips-box">
          <span>温馨提示</span>
          <p>
            针对无法原路返回及无法正常退款的金额，我们会通过银行转账的形式为您完成退款，此处建议您确认并输入正确的银行账号信息及真实姓名，以便顺利完成退款。
          </p>
        </div>
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
          我的银行卡
        </div>
        <div class="top-add-box font14 pointer" @click="dialogVisible = true">
          新增
        </div>
      </div>
      <div class="my-info-box" v-if="cardList.length == 0">
        <div class="font18 tips-color no-card-text">
          很抱歉，暂时没有您的账户信息!
        </div>
        <div class="add-btn-box flex-r pointer" @click="dialogVisible = true">
          <div>
            <img class="add-icon" src="../../assets/img/add.png" alt="" />
          </div>
          <span>添加银行卡</span>
        </div>
      </div>
      <div class="my-card-box" v-else>
        <div class="card-item-box flex-r" v-for="item in cardList">
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
            <!-- <count-down
              :endTime="item.endTime"
              :callback="callback"
              endText="已取消"
            ></count-down> -->
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
import { addCard, updCard, delCard, cardList } from "@/api/card";
import msgBox from "./msg.vue";
// import CountDown from "./countDown.vue";
export default {
  name: "mycard",
  components: {
    msgBox
    // CountDown
  },
  data() {
    return {
      dialogVisible: false,
      cityData: city,
      isZfb: true,
      zfbType: false,
      yhkType: false,
      cardList: [
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
        name: "",
        zfbCard: "",
        cardNumber: "",
        bankName: "",
        bankRegion: [],
        province: "",
        city: "",
        branch: ""
      },
      accountRules: {
        // type: [{ required: true, message: "  ", trigger: "blur" }],
        name: [
          { required: true, message: "开户人姓名不能为空", trigger: "blur" }
        ],
        // zfbCard: [
        //   { required: true, message: "账号不能为空", trigger: "blur" },
        //   {
        //     required: true,
        //     pattern: /^(?:1[3-9]\d{9}|[a-zA-Z\d._-]*\@[a-zA-Z\d.-]{1,10}\.[a-zA-Z\d]{1,20})$/,
        //     message: "请输入正确的支付宝账号(手机号/邮箱)",
        //     trigger: "blur"
        //   }
        // ],
        cardNumber: [
          { required: true, message: "银行卡号不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^([1-9]{1})(\d{14}|\d{18})$/,
            message: "请输入正确的银行卡号",
            trigger: "blur"
          }
        ],
        bankName: [
          { required: true, message: "开户银行不能为空", trigger: "blur" }
        ],
        bankRegion: [
          { required: true, message: "开户地区不能为空", trigger: "blur" }
        ],
        branch: [
          { required: true, message: "开户支行不能为空", trigger: "blur" }
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
          this.cardList = res.data;
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
    },
    callback() {}
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
  background: url("../../assets/img/empty.png") center center no-repeat;
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
  padding: 0px 70px;
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
</style>
