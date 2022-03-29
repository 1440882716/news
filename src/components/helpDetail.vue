<template>
  <div id="container">
    <myHeader></myHeader>
    <div class="content980 p-b-80">
      <div class="logo-box text-left flex-r">
        <img class="logo-img m-r-20" src="../assets/img/logo.png" alt="" />
        <h2 class="font18">帮助中心</h2>
      </div>
      <!-- <div class="font14 text-left">账户设置</div> -->
      <div class="line-box"></div>
      <div class="news-list-box text-left">
        <div>
          <div class="font14 bold-font text-center m-b-20">
            {{ heleData.title }}
          </div>
          <div v-html="heleData.content"></div>
          <div
            class="font14 bold-font main-color m-t-20 text-right pointer"
            @click="downFile(heleData.fileUrl)"
          >
            下载附件
          </div>
          <div class="font14 bold-font text-right m-t-20">
            {{ heleData.creatorName }}
          </div>
          <div class="font14 bold-font text-right m-t-20">
            {{ heleData.crtTime }}
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import myHeader from "./common/myHeader.vue";
import Footer from "./common/footer.vue";
import { newsItem } from "@/api/user";
export default {
  name: "my",
  components: {
    // 注册
    myHeader,
    Footer
  },
  data() {
    return {
      helpId: "",
      heleData: {}
    };
  },
  created() {
    // this.helpId = this.$route.params.helpId;
    this.helpId = this.$route.query.helpId;
    this.getData();
  },
  methods: {
    getData() {
      newsItem({ id: this.helpId }).then(res => {
        if (res.code == 200) {
          this.heleData = res.data;
        }
      });
    },
    // 下载附件
    downFile(url) {
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "附件");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(this.fileUrl);
    }
  }
};
</script>
<style>
@import "../assets/css/gloab.css";
@import "../assets/css/help.css";
</style>
