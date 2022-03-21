<template>
  <div class="container">
    <msgBox ref="tips"></msgBox>
    <!-- 寒假快乐和 -->
    <Header></Header>
    <div class="content p-b-80 m-t-20">
      <h2 class="m-b-10">{{ title }}</h2>
      <div class="text-left" v-html="content"></div>
      <div class="text-center">{{ remarks }}</div>
      <div class="text-right">发布：{{ creatorName }}</div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "./common/header.vue";
import Footer from "./common/footer.vue";
import msgBox from "./common/msg.vue";
import { noticeDetail } from "@/api/user";
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
      remarks: ""
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
        }
      });
    }
  }
};
</script>
<style>
@import "../assets/css/gloab.css";
@import "../assets/css/details.css";
</style>
