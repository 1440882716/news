<template>
  <div class="footer">
    <div class="flex-r footer-box fff-font">
      <div class="our-style">
        <!-- <ul class="flex-r flex-a footer-ul">
          <li class="flex-r">
            <img
              class="footer-img"
              src="../../assets/img/brand-footer.png"
              alt=""
            />
            <div class="flex-c text-left m-l-10 m-t-5">
              <span class="font18 bold600">品质保证</span>
              <span class="font14 ">邮政优选</span>
            </div>
          </li>
          <li class="flex-r">
            <img
              class="footer-img"
              src="../../assets/img/brand-footer.png"
              alt=""
            />
            <div class="flex-c text-left m-l-10 m-t-5">
              <span class="font18 bold600">特色服务</span>
              <span class="font14 ">不一样的感受</span>
            </div>
          </li>
          <li class="flex-r">
            <img
              class="footer-img"
              src="../../assets/img/brand-footer.png"
              alt=""
            />
            <div class="flex-c text-left m-l-10 m-t-5">
              <span class="font18 bold600">集团文化</span>
              <span class="font14 ">正品权威</span>
            </div>
          </li>
          <li class="flex-r">
            <img
              class="footer-img"
              src="../../assets/img/brand-footer.png"
              alt=""
            />
            <div class="flex-c text-left m-l-10 m-t-5">
              <span class="font18 bold600">覆盖全乡</span>
              <span class="font14 ">安全送达</span>
            </div>
          </li>
        </ul> -->
        <div class="des-footer font14 tips-color text-center">
          <span @click="toOtherPage" class="pointer"
            >备案号:蜀ICP备2020035095号-1</span
          >
        </div>
        <!-- <img
          class="footer-logo"
          src="https://www.11185.cn/web/static/img/footer5.png"
          alt=""
        /> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    toOtherPage() {
      window.open("https://beian.miit.gov.cn/#/Integrated/index", "_blank");
    }
  }
};
</script>
<style>
@import "../../assets/css/gloab.css";
.footer {
  width: 100%;
  height: auto;
  /* border-top: 5px solid #a30202; */
  background-color: #333333;
  z-index: 2;
  /* margin-top: 40px; */
}
.footer-box {
  width: 1200px;
  height: auto;
  margin: 0 auto;
}
.our-style {
  width: 100%;
  /* padding-top: 30px; */
  padding-bottom: 10px;
}
.footer-ul {
  width: 100%;
  padding-bottom: 30px;
  /* height: 100%; */
  border-bottom: 2px solid #cccccc;
}
.style-item {
  /* width: 25%; */
  background-color: darksalmon;
}
.footer-img {
  width: 50px;
  height: 50px;
}
.des-footer {
  /* width: 1200px; */
  text-align: center;
  padding-top: 20px;
}
.des-line-box {
  margin-top: 15px;
}
.footer-logo {
  width: 80px;
  height: 30px;
  margin-top: 40px;
}
</style>
