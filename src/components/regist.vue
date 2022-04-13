<template>
  <div class="container">
    <loginHead></loginHead>
    <msgBox ref="tips"></msgBox>
    <div class="content-regist">
      <div class="regist-head flex-r flex-a font20 main-color">
        <div :class="[stepNum == 1 ? 'active-head' : 'not-active']">
          1.验证手机号
        </div>
        <div :class="[stepNum == 2 ? 'active-head' : 'not-active']">
          2.填写账号信息
        </div>
        <div :class="[stepNum == 3 ? 'active-head' : 'not-active']">
          3.注册完成
        </div>
      </div>
      <div class="regist-content font14">
        <!-- 验证手机号 -->
        <div class="regist-step re-step1" v-show="stepNum == 1">
          <div class="re-step-item">
            <div class="flex-r">
              <div class="re-step-left m-r-20">
                <span class="price-main">*</span>
                <span>手机号</span>
              </div>
              <input
                class="re-step-right"
                v-model="rePhone"
                type="text"
                placeholder="请使用实名手机号"
              />
            </div>
            <div class="flex-r m-t-10 m-b-20 m-l-129">
              <i></i>
              <span class="font11 tips-color"
                >验证手机后，可用于登录和密码找回</span
              >
            </div>
          </div>
          <!-- 滑块组件 -->
          <div class="re-step-item flex-r">
            <div class="re-step-left m-r-20">
              <span class="price-main">*</span>
              <span>验证</span>
            </div>
            <Slider status="status"></Slider>
          </div>

          <div class="re-step-item flex-r">
            <div class="re-step-left m-r-20">
              <span class="price-main">*</span>
              <span>手机验证码</span>
            </div>
            <input
              class=" re-step-code"
              type="text"
              v-model="phoneCode"
              placeholder="请输入手机验证码"
            />
            <div class="get-code pointer" @click="getCode">{{ count }}</div>
          </div>
          <!-- 下一步 -->
          <div class="next-step pointer" @click="registStep(1)">下一步</div>
        </div>
        <!-- 填写账号信息 -->
        <div class="regist-step" v-show="stepNum == 2">
          <el-form
            label-width="140px"
            :model="registFrom"
            :rules="registRules"
            ref="registFrom"
          >
            <el-form-item label="用户名" prop="userName">
              <el-input
                v-model="registFrom.userName"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="registFrom.password"
                type="password"
                placeholder="字母、数字组成，不少于6位"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                v-model="registFrom.confirmPassword"
                type="password"
                placeholder="请确认密码"
              ></el-input>
            </el-form-item>
          </el-form>
          <!-- 会员注册与服务协议 -->
          <!-- <div class="flex-r m-t-10 m-b-20 m-l-129">
            <img
              @click="isAgree = !isAgree"
              v-show="isAgree == false"
              class="agree-img m-l-10 m-r-5 pointer"
              src="../assets/img/circle.png"
              alt=""
            />
            <img
              @click="isAgree = !isAgree"
              v-show="isAgree"
              class="agree-img m-l-10 m-r-5 pointer"
              src="../assets/img/check-circle-fill.png"
              alt=""
            />
            <div class="font14 tips-color">
              我已阅读并同意：<span style="color:#409eff"
                >《会员注册与服务协议》</span
              >
            </div>
          </div> -->
          <div class="next-step pointer" @click="registStep(2)">立即注册</div>
        </div>
        <div class="regist-step" v-show="stepNum == 3">
          <!-- <img
            class="regist-over-img"
            src="../assets/img/check-circle-fill-blue.png"
            alt=""
          /> -->
          <span class="font24 primary-color">注册成功!</span>
          <div class="next-step pointer" @click="toLogin">去登录</div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import loginHead from "./common/loginHead.vue";
import Footer from "./common/footer.vue";
import msgBox from "./common/msg.vue";
import Slider from "./common/slider.vue";
import {
  register,
  getSmsCode,
  checkSmsCode,
  isExistMobile,
  isExistUserName
} from "@/api/regist";
export default {
  name: "regist",
  components: {
    loginHead,
    Footer,
    msgBox,
    Slider
  },
  data() {
    const username = (rule, value, callback) => {
      if (value.length <= 1) {
        callback(new Error("用户名不能为空且长度至少为2位"));
      } else {
        callback();
      }
    };
    const userpwd = (rule, value, callback) => {
      let regStr = /^(?=.*\d+)(?=.*[A-Za-z]+)[\w]{6,16}$/;
      if (!regStr.test(value)) {
        callback(new Error("请输入符合要求的密码"));
      } else {
        callback();
      }
    };
    const pwd = (rule, value, callback) => {
      if (value != this.registFrom.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      status: false,
      stepNum: 1,
      count: "获取验证码",
      rePhone: "",
      phoneCode: "",
      registFrom: {
        mobile: "",
        userName: "",
        password: "",
        confirmPassword: "",
        type: 1
      },
      isAgree: false,
      registRules: {
        userName: { required: true, trigger: "blur", validator: username },
        password: { required: true, trigger: "blur", validator: userpwd },
        confirmPassword: { required: true, trigger: "blur", validator: pwd }
      }
    };
  },

  mounted() {},
  methods: {
    getCode() {
      console.log(this.status);
      let regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!regPhone.test(this.rePhone)) {
        this.$refs.tips.toast("请输入正确的手机号");
      } else if (!this.status) {
        this.$refs.tips.toast("请拖动滑块");
      } else {
        isExistMobile({ mobile: this.rePhone }).then(res => {
          if (res.code == 200) {
            if (res.data) {
              this.$refs.tips.toast("改手机号已被注册,请更换手机号");
            } else {
              getSmsCode({ mobile: this.rePhone }).then(res => {
                console.log(res);
                if (res.code == 200) {
                  this.$refs.tips.toast(res.msg);
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
                } else {
                  this.$refs.tips.toast(res.msg);
                }
              });
            }
          } else {
            this.$refs.tips.toast(res.msg);
          }
        });
      }
    },
    registStep(num) {
      if (num == 1) {
        checkSmsCode({ mobile: this.rePhone, smsCode: this.phoneCode }).then(
          res => {
            if (res.code == 200) {
              if (res.data) {
                // 进入下一步
                this.stepNum = num * 1 + 1;
                this.registFrom.mobile = this.rePhone;
              } else {
                this.$refs.tips.toast("验证码错误");
              }
            } else {
              this.$refs.tips.toast(res.msg);
            }
          }
        );
      } else if (num == 2) {
        this.$refs.registFrom.validate(valid => {
          if (valid) {
            register(this.registFrom).then(res => {
              if (res.code == 200) {
                this.stepNum = num * 1 + 1;
              } else {
                this.$refs.tips.toast(res.msg);
              }
            });
          }
        });
      }
    },
    toLogin() {
      this.$router.push({
        path: "/login",
        name: "login"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/gloab.css";
@import "../assets/css/regist.css";
</style>
