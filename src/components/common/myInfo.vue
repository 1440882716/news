<template>
  <div class="my-info">
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
        <div class="my-info-title">个人资料</div>
      </div>
      <div class="my-info-box">
        <div class="info-nav-box flex-r font14 main-color">
          <div class="info-nav-item">基本信息</div>
          <div class="info-nav-item">头像照片</div>
        </div>
        <div class="info-container">
          <div class="my-head-img flex-r">
            <img
              class="head-img m-r-10"
              src="../../assets/img/head.png"
              @click="dialogVisible = true"
              alt=""
            />
            <div class="tips-color font14 m-t-10">
              <div>用户名：<span class="main-color">mu1****2536</span></div>
              <div class="m-t-10">昵称：</div>
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
              <el-form-item label="昵称" prop="name">
                <el-input
                  class=""
                  v-model="ruleForm.name"
                  placeholder="请输入昵称"
                  width="100px"
                ></el-input>
              </el-form-item>
              <el-form-item label="真实姓名">
                <el-input
                  v-model="ruleForm.name"
                  :disabled="true"
                  placeholder="请输入姓名"
                ></el-input>
                <el-button class="primary-btn" type="primary"
                  >实名认证</el-button
                >
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="证件类型">
                <el-input
                  v-model="ruleForm.delivery"
                  :disabled="true"
                  placeholder="请选择证件类型"
                ></el-input>
              </el-form-item>

              <el-form-item label="证件号码">
                <el-input v-model="ruleForm.desc" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input v-model="ruleForm.desc" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="所在地区">
                <el-input v-model="ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input
                  v-model="ruleForm.desc"
                  placeholder="请输入详细街道地址"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="el-btn-box primary-btn"
                  type="primary"
                  @click="submitForm('ruleForm')"
                  >立即创建</el-button
                >
                <el-button class="border-btn" @click="resetForm('ruleForm')"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "仅支持20个字符以内的中英文、数字、下划线等",
            trigger: "blur"
          }
        ]
      }
    };
  },

  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
</style>
