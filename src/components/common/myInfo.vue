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
    <div class="info-content text-left" @click="dialogVisible = true">
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
              class="head-img"
              src="https://bic.11185.cn/zxpt-sc-mbc/user/icon/87/503_1586417749347_995_USER_046.jpg"
              alt=""
            />
            <div></div>
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
      dialogVisible: false
    };
  },

  mounted() {},
  methods: {}
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
  border-bottom: 2px solid #ff8400;
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
  padding: 10px;
}
.head-img {
  width: 75px;
  height: 75px;
}
</style>
