<template>
  <div class="container">
    <msgBox ref="tips"></msgBox>
    <!-- 寒假快乐和 -->
    <Header></Header>
    <div class="content p-b-80">
      公告详情
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "./common/header.vue";
import Footer from "./common/footer.vue";
import msgBox from "./common/msg.vue";
export default {
  components: {
    Header,
    Footer,
    msgBox
  },
  name: "goods",
  data() {
    return {
      noticeId: ""
    };
  },

  created() {
    this.noticeId = this.$route.query.noticeId;
    this.getDetails();
  },
  mounted() {},
  methods: {
    getDetails() {}
  }
};
</script>
<style>
@import "../assets/css/gloab.css";
@import "../assets/css/details.css";
</style>
