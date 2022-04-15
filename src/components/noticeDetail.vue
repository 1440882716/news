<template>
  <div class="container" style="height: 100%;position: relative;">
    <msgBox ref="tips"></msgBox>
    <!-- 寒假快乐和 -->
    <Header></Header>
    <div class="content p-b-80 m-t-20">
      <h2 class="m-b-10">{{ title }}</h2>
      <div class="text-left" v-html="content"></div>
      <div class="text-left m-t-20 m-b-20">备注：{{ remarks }}</div>
      <div class="flex-r">
        <!-- <span>附件地址：{{ fileUrl }}</span> -->
        <!-- <img :src="fileUrl" alt="" /> -->
      </div>
      <div
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
      <!-- <a :href="fileUrl">下载附件</a> -->
    </div>
    <Footer style="position: absolute;bottom: 0;"></Footer>
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
      createTime: ""
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
        }
      });
    },
    // 下载附件
    downFile() {
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = this.fileUrl;
      link.setAttribute("download", "附件");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(this.fileUrl);
    }
    // back() {
    //   debugger;
    //   if (window.history.length <= 1) {
    //     this.$router.push({ path: "/" });
    //     return false;
    //   } else {
    //     this.$router.go(-1);
    //   }
    // }
  },
  destroyed() {
    this.noticeId = "";
  }
};
</script>
<style>
@import "../assets/css/gloab.css";
/* @import "../assets/css/details.css"; */
</style>
