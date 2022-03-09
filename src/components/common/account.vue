<template>
  <div class="my-info">
    <msgBox ref="tips"></msgBox>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div class="info-content text-left">
      <div class="title-box">
        <div class="my-info-title" @click="dialogVisible = true">
          {{ titleTxt }}
        </div>
      </div>
      <div class="my-info-box">
        <div class="info-container" v-show="navTitle == 0">
          <!-- <div v-show="navTitle == 0"> -->
          <div class="font12 tips-color tips-box">
            建议您启动全部安全设置，以保障账户及资金安全
          </div>
          <!-- </div> -->
          <div class="change-item flex-r flex-b">
            <div>
              <span class="font14 f666 m-r-5">登录密码</span
              ><span class="tips-color">|</span>
              <span class="font12 yellow-color"
                >互联网账号存在被盗风险，建议您定期更改密码以保护账户安全。</span
              >
            </div>
            <span class="font14 myActiveColor pointer" @click="changeItem(1)"
              >修改</span
            >
          </div>
          <div class="change-item flex-r flex-b">
            <div>
              <span class="font14 f666 m-r-5">绑定手机</span
              ><span class="tips-color">|</span>
              <span class="font12 yellow-color"
                >若您绑定的手机 已丢失或已停用，请立即修改。</span
              >
            </div>
            <span class="font14 myActiveColor pointer" @click="changeItem(2)"
              >修改</span
            >
          </div>
          <div class="change-item flex-r flex-b">
            <div>
              <span class="font14 f666 m-r-5">注销账户</span
              ><span class="tips-color">|</span>
            </div>
            <span class="font14 myActiveColor pointer" @click="changeItem(3)"
              >申请注销</span
            >
          </div>
          <!-- 提示 -->
          <div class="tips-safe-box">
            <span class="font14 f666">安全服务提示</span>
            <p class="font12 f999 m-t-10">
              1.确认您登录的邮政平台，注意防范进入钓鱼网站，不要轻信各种即时通讯工具发送的商品或支付链接，谨防网购诈骗。
            </p>
            <p class="font12 f999 m-t-10">
              2.建议您安装杀毒软件，并定期更新操作系统等软件补丁，确保账户及交易安全。
            </p>
          </div>
        </div>
        <!-- 修改密码 -->
        <div class="info-container" v-show="navTitle == 1">
          <el-form
            label-width="100px"
            :model="changePwd"
            :rules="pwdRules"
            ref="changePwd"
          >
            <el-form-item label="旧密码" prop="oldPwd">
              <el-input
                v-model="changePwd.oldPwd"
                placeholder="请输入旧密码"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
              <el-input
                v-model="changePwd.newPwd"
                type="password"
                placeholder="请输入新密码（字母加数字组合至少6位）"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmPwd">
              <el-input
                v-model="changePwd.confirmPwd"
                placeholder="请再次输入新密码"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="primary-btn" @click="confirmChange"
                >确认修改</el-button
              >
              <el-button class="border-btn" @click="navTitle = 0"
                >返回</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <!-- 绑定手机 -->
        <div class="info-container font14" v-show="navTitle == 2">
          <div class="re-step-item flex-r">
            <div class="re-step-left m-r-20">
              <span class="price-main">*</span>
              <span class="f666">新手机号</span>
            </div>
            <el-input
              type="text"
              v-model="newPhone"
              placeholder="请输入新手机号"
            ></el-input>
            <div class="get-code pointer" @click="getNewCode">
              {{ count }}
            </div>
          </div>
          <div class="re-step-item m-t-20">
            <div class="flex-r">
              <div class="re-step-left m-r-20">
                <span class="price-main">*</span>
                <span class="f666">验证码</span>
              </div>
              <el-input
                v-model="phoneCode"
                type="text"
                placeholder="请输入验证码"
              ></el-input>
            </div>
          </div>
          <div class="pwd-btns-box">
            <el-button class="primary-btn m-r-10" @click="toNewPhone"
              >确认</el-button
            >
            <el-button class="border-btn" @click="navTitle = 0">返回</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updPwd, updMobile, delAccount } from "@/api/user";
import { getSmsCode } from "@/api/regist";
import msgBox from "./msg.vue";
export default {
  name: "account",
  components: {
    msgBox
  },
  data() {
    const pwd = (rule, value, callback) => {
      if (value != this.changePwd.newPwd) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      titleTxt: "账户安全",
      navTitle: 0,
      dialogVisible: false,
      oldTOnew: "old",
      count: "发送验证码",
      // newcount: "发送验证码",
      oldPhone: "17608080989",
      newPhone: "",
      phoneCode: "",
      changePwd: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: ""
      },
      pwdRules: {
        oldPwd: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        newPwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            required: true,
            pattern: /^(?=.*\d+)(?=.*[A-Za-z]+)[\w]{6,16}$/,
            message: "请输入符合要求的密码",
            trigger: "blur"
          }
        ],
        confirmPwd: [{ required: true, trigger: "blur", validator: pwd }]
      }
    };
  },

  mounted() {},
  methods: {
    changeItem(num) {
      if (num == 1) {
        this.navTitle = num;
        this.titleTxt = "修改密码";
      } else if (num == 2) {
        this.navTitle = num;
        this.titleTxt = "请先完成身份验证";
        // this.oldTOnew = "old";
      } else {
        this.$confirm("确定要注销这个账号吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            delAccount().then(res => {
              if (res.code == 200) {
                // 注销成功，清除登录信息，回到首页
              } else {
                this.$refs.tips.toast(res.msg);
              }
            });
          })
          .catch(() => {});
      }
    },
    // 确认修改密码
    confirmChange() {
      this.$refs.changePwd.validate(valid => {
        if (valid) {
          updPwd(this.changePwd).then(res => {
            if (res.code == 200) {
              // 修改密码成功后 推出登录
              this.navTitle = 0;
            } else {
            }
          });
        }
      });
    },
    // 获取验证码
    getCode() {
      // 发送请求获取验证码
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.timeFlag = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.timeFlag = true;
            clearInterval(this.timer);
            this.timer = null;
            this.count = "获取验证码";
          }
        }, 1000);
      }
    },

    // 发送验证码给新手机
    getNewCode() {
      let regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!regPhone.test(this.newPhone)) {
        this.$refs.tips.toast("请输入正确的手机号");
      } else {
        getSmsCode({ mobile: this.newPhone }).then(res => {
          if (res.code == 200) {
            this.$refs.tips.toast(res.msg);
            this.getCode();
          } else {
            this.$refs.tips.toast(res.msg);
          }
        });
      }
    },
    // 绑定新手机
    toNewPhone() {
      if (this.phoneCode != "") {
        updMobile({ mobile: this.newPhone, smsCode: this.phoneCode }).then(
          res => {
            if (res.code == 200) {
              this.$refs.tips.toast(res.msg);
              this.navTitle = 0;
            } else {
              this.$refs.tips.toast(res.msg);
            }
          }
        );
      } else {
        this.$refs.tips.toast("请输入验证码");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/gloab.css";
a {
  text-decoraction: none !important;
}
router-link {
  text-decoraction: none;
}
.router-link-active {
  text-decoration: none;
}
.info-content {
  width: 100%;
}
.title-box {
  /* border-bottom: 2px solid #e5e5e5; */
}
.my-info-title {
  width: 140px;
  padding-bottom: 8px;
}
.my-info-box {
  width: 100%;
  min-height: 400px;
  border: 1px solid #e5e5e5;
  margin-top: 10px;
}
.info-container {
  padding: 15px 20px;
}
.el-form-item {
  margin-bottom: 22px;
}
.el-input {
  width: 45%;
}
.tips-box {
  padding: 10px 7px;
  background-color: #feeed8;
  border: 1px solid #fccab8;
}
.change-item {
  padding: 20px 0px 20px 30px;
  border-bottom: 1px solid #e5e5e5;
}
.tips-safe-box {
  padding: 25px;
  background-color: #f8f8f8;
  margin: 50px 0 140px 0;
}
/* =========================验证手机号 */
.re-step-item {
  /* margin-bottom: 20px; */
}
.re-step-left {
  width: 109px;
  height: 34px;
  line-height: 34px;
  text-align: right;
  /* background-color: bisque; */
}
.re-step-right {
  width: 363px;
  height: 40px;
  padding-left: 15px;
  border: 1px solid #ececf0;
  border-radius: 2px;
}
.re-step-code {
  width: 242px;
  height: 32px;
  padding-left: 10px;
  border: 1px solid #ececf0;
}
.get-code {
  width: 94px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-left: 22px;
  color: #409eff;
  background-color: #f5f5f5;
}
.pwd-btns-box {
  margin-left: 127px;
  margin-top: 30px;
}
</style>
