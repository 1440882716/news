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
        <div class="my-info-title" @click="dialogVisible = true">个人资料</div>
      </div>
      <div class="my-info-box">
        <div class="info-nav-box flex-r font14 main-color">
          <div
            :class="[
              'info-nav-item',
              'pointer',
              navTitle == 1 ? 'main-red' : 'main-color'
            ]"
            @click="selectNav(1)"
          >
            基本信息
          </div>
          <div
            :class="[
              'info-nav-item',
              'pointer',
              navTitle == 2 ? 'main-red' : 'main-color'
            ]"
            @click="selectNav(2)"
          >
            头像照片
          </div>
        </div>
        <div class="info-container" v-show="navTitle == 1">
          <div class="my-head-img flex-r">
            <img
              class="head-img m-r-10"
              :src="headImg"
              @click="selectNav(2)"
              alt=""
            />
            <div class="tips-color font14 m-t-10">
              <div>
                用户名：<span class="main-color">{{ userName }}</span>
              </div>
              <div class="m-t-10">昵称：{{ nickName }}</div>
            </div>
          </div>
          <div class="m-t-20">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="昵称">
                <el-input
                  class=""
                  v-model="ruleForm.nickname"
                  placeholder="请输入昵称"
                  width="100px"
                ></el-input>
              </el-form-item>
              <el-form-item label="真实姓名">
                <el-input
                  v-model="ruleForm.name"
                  placeholder="请输入姓名"
                ></el-input>
                <!-- <el-button class="primary-btn" type="primary"
                  >实名认证</el-button
                > -->
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="ruleForm.sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input v-model="ruleForm.idCard"></el-input>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input v-model="ruleForm.mobile" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="所在地区">
                <!-- <el-input v-model="ruleForm.desc"></el-input> -->
                <el-cascader
                  v-model="ruleForm.region"
                  :options="regionData"
                  :props="{
                    expandTrigger: 'hover',
                    value: 'id',
                    label: 'ext_name',
                    children: 'childs'
                  }"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="详细地址">
                <el-input
                  v-model="ruleForm.address"
                  placeholder="请输入详细街道地址"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="el-btn-box primary-btn"
                  type="primary"
                  @click="submitForm"
                  >保存</el-button
                >
                <el-button class="border-btn" @click="resetForm('ruleForm')"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="info-container" v-show="navTitle == 2">
          <el-upload
            class="avatar-uploader"
            :headers="{ Authorization: token }"
            action="http://192.168.31.23:8080/client/user/updAvatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-error="uploadError"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            <img
              v-else
              class="tips-img avatar-uploader-icon"
              src="../../assets/img/people3.png"
              alt=""
            />
          </el-upload>
          <div class="font12 tips-color m-b-20">
            仅支持JPG、PNG格式，文件小于2M
          </div>
          <!-- <el-button class="primary-btn" type="primary" @click="keepHead"
            >保存</el-button
          > -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import region from "../../assets/data/area_format_user.json";
import msgBox from "./msg.vue";
import { getToken, removeLogin } from "@/utils/auth";
import { userInfo, updPersonalData, updAvatar } from "@/api/user";
export default {
  name: "info",
  components: {
    msgBox
  },
  data() {
    return {
      imgApi: this.globleImgApi,
      navTitle: 1,
      token: "",
      dialogVisible: false,
      regionData: region,
      imageUrl: "",
      userName: "",
      nickName: "",
      headImg: "../../assets/img/people3.png",
      ruleForm: {
        nickname: "",
        name: "",
        sex: "",
        idCard: "",
        mobile: "",
        region: "",
        address: "",
        province: "",
        city: "",
        area: ""
      },
      rules: {}
    };
  },
  created() {
    this.token = getToken();
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      userInfo().then(res => {
        if (res.code == 200) {
          let arr = [res.data.province, res.data.city, res.data.area];
          this.userName = res.data.userName;
          this.nickName = res.data.nickname;
          this.ruleForm.sex = res.data.sex;
          this.ruleForm.mobile = res.data.mobile;
          this.ruleForm.region = arr;
          this.ruleForm.address = res.data.address;
          if (res.data.avatar != "") {
            this.headImg = this.imgApi + res.data.avatar;
          } else {
            this.headImg = "../../assets/img/people3.png";
          }

          // console.log(this.imgApi);
          // debugger;
        } else {
          // removeLogin()
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    selectNav(num) {
      this.navTitle = num;
      console.log(num);
    },
    // 保存信息
    submitForm() {
      // this.$refs.formName.validate(valid => {
      // if (valid) {
      // 提交要修改的信息
      this.ruleForm.province = this.ruleForm.region[0];
      this.ruleForm.city = this.ruleForm.region[1];
      this.ruleForm.area = this.ruleForm.region[2];
      // debugger;
      updPersonalData(this.ruleForm).then(res => {
        if (res.code == 200) {
          this.$refs.tips.toast(res.msg);
          this.getData();
        } else {
          this.$refs.tips.toast(res.msg);
        }
      });
      // } else {
      //   return false;
      // }
      // });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res.data);
      if (res.code == 200) {
        this.getData();
        this.$refs.tips.toast(res.msg);
      }
    },
    uploadError(error, file, fileList) {
      let errorMsg = JSON.parse(error.message);
      // console.log(errorMsg);
      if (errorMsg.code == 401) {
        this.$router.push({
          path: "/login",
          name: "login"
        });
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$refs.tips.toast("上传头像图片只能是 JPG、png 格式!");
      }
      if (!isLt2M) {
        this.$refs.tips.toast("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 保存上传的头像
    keepHead() {}
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
  /* height: 50px; */
  /* line-height: 50px; */
  /* background-color: darksalmon; */
}
.title-box {
  /* padding-bottom: 20px; */
  border-bottom: 2px solid #e5e5e5;
}
.my-info-title {
  width: 120px;
  padding-bottom: 15px;
  /* border-bottom: 2px solid #ff8400; */
}
.my-info-box {
  width: 100%;
  margin-top: 10px;
}
.info-nav-box {
  border-bottom: 1px solid #e4e7ed;
}
.info-nav-item {
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  font-weight: 500;
  border: 1px solid #e4e7ed;
  border-bottom: none;
}
.info-container {
  padding: 20px;
}
.my-head-img {
  /* width: 100%; */
  padding: 10px;
  background-color: #f2f2f2;
}
.head-img {
  width: 75px;
  height: 75px;
  border-radius: 50%;
}

.el-form-item {
  margin-bottom: 22px;
}
.el-input {
  width: 45%;
}
.el-cascader {
  width: 333px;
}
/* 上传头像 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  /* width: 178px;
  height: 178px;
  line-height: 178px; */
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid #e4e7ed;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.tips-img {
  width: 100px;
  height: 100px;
}
</style>
