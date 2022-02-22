<template>
  <div class="com-login">
    <msgBox ref="tips"></msgBox>
    <div class="login-type flex-r flex-a m-b-10 pointer">
      <div
        :class="['login-item-head', logintype == 1 ? 'active-type' : '']"
        @click="loginType(1)"
      >
        密码登录
      </div>
      <div
        :class="['login-item-head', logintype == 2 ? 'active-type' : '']"
        @click="loginType(2)"
      >
        短信登录
      </div>
    </div>
    <!-- 账号密码登录 -->
    <div v-show="logintype == 1">
      <div class="flex-r m-t-20">
        <img src="../../assets/img/people.png" alt="" />
        <input
          v-model="account"
          class="account-inp"
          type="text"
          placeholder="账号"
        />
      </div>
      <div class="flex-r m-t-20">
        <img src="../../assets/img/lock.png" alt="" />
        <input
          v-model="pwd"
          class="account-inp"
          type="password"
          placeholder="密码"
        />
      </div>
    </div>
    <div v-show="logintype == 2">
      <div class="flex-r m-t-20">
        <img src="../../assets/img/phone.png" alt="" />
        <input
          v-model="phone"
          class="account-inp"
          type="number"
          placeholder="手机号码"
        />
      </div>
      <div class="flex-r m-t-20 m-b-20">
        <img src="../../assets/img/lock.png" alt="" />
        <input
          v-model="msgCode"
          class="msg-code"
          type="password"
          placeholder="短信验证码"
        />
        <div class="code-btn font12">获取手机短信</div>
      </div>
      <div class="font12 text-left">
        手机首次登录即完成注册，代表同意
        <span style="color:#409eff">《平台会员注册与服务协议》</span>
      </div>
    </div>

    <div class="fff-font font12 login-btn m-t-30" @click="login">立即登录</div>
    <div class="font12 tips-color other-page flex-r flex-e p-t-30">
      <router-link to="../forget" class="m-l-10" style="text-decoration: none;"
        >忘记密码</router-link
      >
      <router-link to="../regist" class="m-l-10" style="text-decoration: none;"
        >快速注册</router-link
      >
    </div>
  </div>
</template>

<script>
import msgBox from "./msg.vue";
export default {
  name: "loginHead",
  components: {
    msgBox
  },
  data() {
    return {
      logintype: 1,
      account: "",
      pwd: "",
      phone: "",
      msgCode: ""
    };
  },

  mounted() {},
  methods: {
    loginType(num) {
      this.logintype = num;
    },
    login() {
      console.log(this.account);
      if (this.logintype == 1) {
        // debugger;
        if (this.account == "") {
          this.$refs.tips.toast("请输入账号");
        } else if (this.pwd == "") {
          this.$refs.tips.toast("请输入密码");
        } else {
          // 提交数据登录
          this.rq
            .get("/goods/app/index/banner", {
              params: { name: this.account, pwd: this.pwd }
            })
            .then(res => {
              console.log(res);
              debugger;
            });
        }
      } else {
        if (this.phone == "") {
          this.$refs.tips.toast("请输入手机号");
        } else if (this.msgCode == "") {
          this.$refs.tips.toast("请输入短信验证码");
        } else {
          // 提交数据登录
        }
      }
      //   debugger;
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
.com-login {
  min-height: 260px;
  padding: 15px;
  padding-top: 0;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
}
.login-type {
  width: 100%;
  /* padding: 10px 0px; */
  /* height: ; */
}
.login-item-head {
  padding: 10px 0px;
}
.active-type {
  border-bottom: 3px solid #409eff;
}
.account-inp {
  width: calc(100% - 32px);
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #e6e6e6;
  border-left: none;
}
.msg-code {
  width: 122px;
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #e6e6e6;
  border-left: none;
}
.code-btn {
  width: 90px;
  height: 30px;
  line-height: 30px;
  color: #b3adad;
  cursor: pointer;
  background-color: #f5f5f5;
  border: 1px solid #e6e6e6;
  border-left: none;
}
.login-btn {
  width: 100%;
  height: 32px;
  text-align: center;
  line-height: 32px;
  background-color: #409eff;
  cursor: pointer;
}
.other-page {
  width: 100%;
}
.other-page div {
  cursor: pointer;
}
</style>
