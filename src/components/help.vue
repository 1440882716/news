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
        <div
          class="help-data-box m-b-10 pointer"
          v-for="item in newData"
          @click="helpDatail(item.id)"
        >
          <div class="font16 bold-font m-b-10">{{ item.title }}</div>
          <!-- <div v-html="item.content" class="pointer"></div> -->
        </div>
      </div>

      <!-- <div
        style="width:100px;height:100px;background-color:#ffcccc;display:none"
      ></div>
      <div
        style="width:100px;height:100px;background-color:#fffccc;visibility:hidden"
      ></div>
      <div
        style="width:100px;height:100px;background-color:#ffffcc;opacity:0"
      ></div> -->
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import myHeader from "./common/myHeader.vue";
import Footer from "./common/footer.vue";
import { newsList, newsItem } from "@/api/user";
export default {
  name: "my",
  components: {
    // 注册
    myHeader,
    Footer
  },
  data() {
    return {
      navNum: 0,
      newData: []
    };
  },
  created() {
    // this.navNum = this.$route.query.orderPage;
    this.getData();
  },
  methods: {
    chooseNav(ind) {
      this.navNum = ind;
    },
    getData() {
      newsList().then(res => {
        if (res.code == 200) {
          this.newData = res.data;
        }
      });
    },
    helpDatail(id) {
      // this.$router.push({
      // path: "/helpDetail",
      // query: {
      //   helpId: id
      // }
      // name: "helpDetail",
      // params: {
      //   helpId: id
      // }
      // });
      let rotuetURl = this.$router.resolve({
        path: "/helpDetail",
        query: { helpId: id }
      });
      window.open(rotuetURl.href, "_blank");
    }
  }
};
</script>
<style>
@import "../assets/css/gloab.css";
@import "../assets/css/help.css";
</style>
