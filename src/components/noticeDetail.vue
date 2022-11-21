<template>
  <div class="container" style="height: 100%">
    <msgBox ref="tips"></msgBox>
    <!-- 寒假快乐和 -->
    <Header></Header>

    <div class="content p-b-80 m-t-20" style="min-height: 560px;">
      <h2 class="m-b-10">{{ title }}</h2>
      <div class="text-left content-style" v-html="content"></div>
      <div
        v-if="remarks != '' && remarks != undefined"
        class="text-left m-t-20 m-b-20"
      >
        备注：{{ remarks }}
      </div>
      <div class="flex-r">
        <!-- <span>附件地址：{{ fileUrl }}</span>
        <img :src="fileUrl" alt="" /> -->
      </div>
      <div
        v-if="isImg"
        class="font14 bold-font main-color m-t-20 text-right pointer"
        @click="dialogVisible = true"
      >
        附件预览
      </div>
      <div
        v-if="fileUrl != '' && fileUrl != undefined"
        class="font14 bold-font main-color m-t-20 text-right pointer"
        @click="downFile"
      >
        下载附件
      </div>
      <div class="font14 bold-font text-right m-t-20">
        发布者：{{ creatorName }}
      </div>
      <div class="font14 bold-font text-right m-t-20">
        发布时间：{{ createTime }}
      </div>
    </div>
    <!-- 图片预览 -->
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <img src="" alt="" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="downFile">下载附件</el-button>
      </span>
    </el-dialog>
    <Footer style="margin-top: 40px;"></Footer>
  </div>
</template>
<script>
import Header from "./common/header.vue";
import Footer from "./common/footer.vue";
import msgBox from "./common/msg.vue";
import { noticeDetail, noticeDown } from "@/api/user";
export default {
  components: {
    Header,
    Footer,
    msgBox
  },
  name: "goods",
  data() {
    return {
      noticeId: "",
      title: "",
      content: "",
      time: "",
      creatorName: "",
      remarks: "",
      fileUrl: "",
      createTime: "",
      isImg: false,
      dialogVisible: false
    };
  },

  created() {
    this.noticeId = this.$route.query.noticeId;
    this.getDetails();
  },
  mounted() {},
  methods: {
    getDetails() {
      noticeDetail({ id: this.noticeId }).then(res => {
        if (res.code == 200) {
          this.title = res.data.title;
          this.content = res.data.content;
          this.time = res.data.createTime;
          this.remarks = res.data.remarks;
          this.createTime = res.data.createTime;
          this.fileUrl = res.data.fileUrl;
          if (this.fileUrl != "" && this.fileUrl != undefined) {
            this.valiImgType(this.fileUrl);
          }
        }
      });
    },
    fun1() {
      console.log(6666);
      debugger;
    },
    valiImgType(str) {
      if (!/.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(str)) {
        this.isImg = false;
      } else {
        this.isImg = true;
      }
    },
    // 图片类型的附件预览
    lookImg() {},
    // 下载附件
    downFile() {
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = "https://paper.cdzkzs.top" + this.fileUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(this.fileUrl);
      this.dialogVisible = false;
    }
  },
  destroyed() {
    this.noticeId = "";
  }
};
</script>
<style>
@import "../assets/css/gloab.css";
/* @import "../assets/css/details.css"; */
.content-style {
  width: 100%;
  margin: 0 auto;
}
.content-style p img {
  width: 800px;
  margin: 0 auto;
}
</style>
