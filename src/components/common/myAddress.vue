<template>
  <div class="my-info">
    <el-dialog
      title="新增地址"
      :visible.sync="dialogVisible"
      @close="closeDialog"
      width="70%"
    >
      <div class="font14 dialog-content flex-r flex-b">
        <div style="width: 600px;">
          <el-form
            label-width="120px"
            :model="accountForm"
            :rules="accountRules"
            ref="accountForm"
          >
            <el-form-item label="收货人" prop="name">
              <el-input
                v-model="accountForm.name"
                placeholder="请输入姓名"
                type="text"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="zfbCard">
              <el-input
                v-model="accountForm.zfbCard"
                type="text"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="所在地区" prop="bankRegion">
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
            <el-form-item label="详细地址" prop="bankCard">
              <textarea
                class="textarea-box"
                v-model="accountForm.bankCard"
                placeholder="请输入详细地址"
                cols="10"
                rows="10"
              ></textarea>
              <!-- <el-input
                v-model="accountForm.bankCard"
                type="text"
                placeholder="请输入详细地址"
              ></el-input> -->
            </el-form-item>
            <el-form-item label="固定电话" prop="bankItem">
              <el-input
                v-model="accountForm.bankItem"
                placeholder="请输入固定电话（格式：010-63700000）"
                type="text"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮编" prop="bankName">
              <el-input
                v-model="accountForm.bankName"
                type="text"
                placeholder="请输入邮政编码"
              ></el-input>
            </el-form-item>

            <el-form-item label="标签" prop="bankItem">
              <el-input
                v-model="accountForm.bankItem"
                placeholder="请输入标签（如：家里、公司）"
                type="text"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>

        <Map></Map>
      </div>
      <div class="add-card-btn fff-font pointer" @click="dialogVisible = true">
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
          我的银行卡/支付宝
        </div>
        <div class="top-add-box font14 pointer" @click="dialogVisible = true">
          新增
        </div>
      </div>
      <div class="my-info-box" v-if="cardList.length == 0">
        <div class="font18 tips-color no-card-text">
          很抱歉，暂时没有您的地址信息!
        </div>
        <!-- <div class="add-btn-box flex-r pointer" @click="dialogVisible = true">
          <div>
            <img class="add-icon" src="../../assets/img/add.png" alt="" />
          </div>
          <span>添加银行卡/支付宝</span>
        </div> -->
      </div>
      <div class="my-card-box" v-else>
        <div class="card-item-box flex-r" v-for="item in cardList">
          <div class="type-img-box" v-if="item.type == 1">
            <img class="type-img" src="../../assets/img/zfb.png" alt="" />
            <div class="tips-color">支付宝</div>
          </div>
          <div class="type-img-box" v-else>
            <img class="type-img" src="../../assets/img/bank.png" alt="" />
            <div class="tips-color">银行卡</div>
          </div>

          <div class="card-info font12">
            <div class="flex-r text-center m-t-20">
              <div class="tips-color card-name-box">姓名：</div>
              <span>{{ item.name }}</span>
            </div>
            <div class="flex-r text-center">
              <div class="tips-color card-name-box" v-if="item.type == 1">
                支付宝账号：
              </div>
              <div class="tips-color card-name-box" v-else>银行卡号：</div>
              <span>{{ item.account }}</span>
            </div>
            <div class="flex-r text-center" v-if="item.type == 2">
              <div class="tips-color card-name-box">银行：</div>
              <span>{{ item.bank }}</span>
            </div>
          </div>
          <div class="handle-box flex-r flex-e">
            <div class="handle-icon-box1" @click="changeAccount(item)">
              <img
                class="handle-icon1"
                src="../../assets/img/pencil.png"
                alt=""
              />
            </div>
            <div class="handle-icon-box2" @click="delAccount(item)">
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
import city from "../../assets/data/area_format_user.json";
import Map from "./map.vue";
export default {
  name: "mycard",
  components: {
    Map
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
        type: 1,
        name: "",
        zfbCard: "",
        bankCard: "",
        bankName: "",
        bankRegion: "",
        bankItem: ""
      },
      accountRules: {
        type: [{ required: true, message: "  ", trigger: "blur" }],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        zfbCard: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^(?:1[3-9]\d{9}|[a-zA-Z\d._-]*\@[a-zA-Z\d.-]{1,10}\.[a-zA-Z\d]{1,20})$/,
            message: "请输入正确的支付宝账号(手机号/邮箱)",
            trigger: "blur"
          }
        ],
        bankCard: [
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
        bankItem: [
          { required: true, message: "开户支行不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //   关闭弹窗后清除表单内容
    closeDialog() {
      this.$nextTick(() => {
        this.$refs.accountForm.clearValidate();
      });
    },
    chooseLabel(value) {
      console.log(value);
      if (value == 1) {
        this.isZfb = true;
      } else {
        this.isZfb = false;
      }
    },
    // 修改支付宝/银行卡信息
    changeAccount(info) {
      if (info.type == 1) {
        this.isZfb = true;
        this.yhkType = true;
        this.accountForm.type = 1;
        this.accountForm.name = info.name;
        this.accountForm.zfbCard = info.account;
      } else {
        this.isZfb = false;
        this.zfbType = true;
        this.accountForm.type = 1;
        this.accountForm.name = info.name;
        this.accountForm.bankCard = info.account;
        this.accountForm.bankRegion = info.bankRegion;
        this.accountForm.bankItem = info.bankItem;
      }
      this.dialogVisible = true;
    },
    // 删除支付宝/银行卡
    delAccount(info) {
      console.log(info);
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
  background: url("../../assets/img/emptyAddress.png") center center no-repeat;
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
.textarea-box {
  width: 95%;
  border: 1px solid #dcdfe6;
  padding: 10px;
  border-radius: 4px;
  resize: none;
}
</style>
