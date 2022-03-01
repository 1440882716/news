<template>
  <div class="container">
    <Header></Header>
    <!-- 搜索条 -->
    <!-- <div class="content">
      <div class="search-box flex-r flex-b">
        <img
          class="logo-img"
          src="data:image/png;base64,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"
          alt=""
        />
        <div class="flex-r search-inp">
          <input
            type="text"
            class="inp-box"
            v-model="keyWord"
            placeholder="请输入内容"
          />
          <button class="btn-search fff-font" @click="toList">搜索</button>
        </div>
      </div>
    </div> -->
    <!-- 轮播、商品模块 -->
    <div class="full-container gray-bgc p-t-10 p-b-80">
      <!-- 分类和广告 -->
      <div class="content bannar-center-box flex-r flex-b">
        <!-- 轮播图 -->
        <div class="bannar-box">
          <div class="block bannar-box">
            <el-carousel trigger="click" height="340px">
              <el-carousel-item class="bannar-item" v-for="item in bannarArr">
                <img style="width: 1200px;height: 340px;" :src="item" alt="" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      <!-- 标题 -->
      <div class="content flex-r flex-b title-box">
        <div class="font18 bold-font">人民权力报</div>
        <div class="pointer" @click="toList">
          去订阅<i class="el-icon-arrow-right"></i>
        </div>
      </div>

      <!-- 两大分类 -->
      <div class="content m-t-20">
        <!-- 人民权利报 -->
        <div class="good-item flex-r">
          <img class="class-img" src="../assets/img/class-img.png" alt="" />

          <div class="news-des0 news-des1 fff-font text-left">
            <span class="font14 text-left m-t-10">
              《人民权利报》的宗旨、任务是：坚持党的基本路线，以宪法为依据，本着“一切权利属于人民”的宗旨，积极宣传宪法和法律，宣传人民代表大会制度，宣传社会主义民主和社会主义法制；为地方各级人大及其常委会履行职权服务，为各级人大代表履行职责服务，为进一步坚持和完善人民代表大会制度，不断推行社会主义民主和社会主义法制服务，为人民行使当家作主的政治权利和维护人民的合法利益服务。
            </span>
          </div>
          <div class="news-des0 news-des2 fff-font text-left">
            <span class="font14 text-left m-t-10">
              《人民权利报》版面内容安排：一版要闻综述，评论杂谈，省际交往，代表风采；二版民主政治，人生追求，典型报道，经验交流；三版道德法制，社会治理，经济新闻，权益保护；四版文摘文苑，世态风情，人文自然大观等。要求报纸图文并茂，贴近现实、贴近群众、贴近生活，成为人大工作的窗口，人大代表的益友，舆论监督的工具，民主法制的论坛。
            </span>
          </div>
          <div class="buy-btn fff-font pointer" @click="toList">立即订阅</div>
        </div>
      </div>
      <!-- 标题 -->
      <div class="content flex-r flex-b title-box">
        <div class="font18 bold-font">民主法制建设</div>
        <div class="pointer" @click="toList">
          去订阅<i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="content m-t-20">
        <!-- 人民权利报 -->
        <div class="good-item flex-r">
          <img class="class-img" src="../assets/img/class-img.png" alt="" />

          <div class="book-des0 book-des1 fff-font text-left">
            <span class="font14 text-left m-t-10">
              《民主法制建设》杂志是四川省人民代表大会常务委员会创办的机关刊物。是全国人大系统创办较早的刊物之一。刊物为国际大16开，64页，四封彩印，面向国内外公开发行。
            </span>
          </div>
          <div class="book-des0 book-des2 fff-font text-left">
            <span class="font14 text-left m-t-10">
              倡言民主政治，弘扬法治精神，捕捉社会热点，反映民众心声。为推进中国的社会主义民主政治服务；为健全社会主义民主、完善人民代表大会及其常务委员会的各项职能服务；为依法治国，建设社会主义法治国家服务。杂志创办以来，受到了社会各界的支持和赞扬，先后被评为四川省优秀期刊和四川省一级期刊。《民主法制建设》杂志的主要栏目有：本月聚焦、本刊专稿、思考与探索、基层园地、法制时空等。
            </span>
          </div>
          <div class="buy-btn-book fff-font pointer" @click="toList">
            立即订阅
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./common/header.vue";
import bannar from "./common/bannar.vue";
import Footer from "./common/footer.vue";
// import { goodsInfo } from "@/api/classfy";
export default {
  components: {
    Header,
    bannar,
    Footer
  },

  name: "index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      keyWord: "",
      bannarArr: [
        "https://bic.11185.cn/zxpt-sc-sys/news/906_1644653723588_696_SYS_817.jpg.webp",
        "https://bic.11185.cn/zxpt-sc-sys/news/611_1643533765680_968_SYS_113.jpg.webp",
        "https://bic.11185.cn/zxpt-sc-sys/news/254_1643533290041_769_SYS_836.jpg.webp"
      ],

      goodsArr: [
        {
          img:
            "https://bic.11185.cn/zxpt-sc-sys/news/723_1635909552430_316_SYS_158.jpg.webp",
          name: "冬奥会个性化邮票长卷珍藏套装",
          price: 398.0
        },
        {
          img:
            "https://bic.11185.cn/zxpt-sc-sys/news/975_1641352944086_955_SYS_097.jpg.webp",
          name: "冬奥会个性化邮票长卷珍藏套装",
          price: 398.0
        },
        {
          img:
            "https://bic.11185.cn/zxpt-sc-sys/news/723_1635909552430_316_SYS_158.jpg.webp",
          name: "冬奥会个性化邮票长卷珍藏套装",
          price: 398.0
        },
        {
          img:
            "https://bic.11185.cn/zxpt-sc-sys/news/723_1635909552430_316_SYS_158.jpg.webp",
          name: "冬奥会个性化邮票长卷珍藏套装",
          price: 398.0
        },
        {
          img:
            "https://bic.11185.cn/zxpt-sc-sys/news/975_1641352944086_955_SYS_097.jpg.webp",
          name: "冬奥会个性化邮票长卷珍藏套装",
          price: 398.0
        },
        {
          img:
            "https://bic.11185.cn/zxpt-sc-sys/news/723_1635909552430_316_SYS_158.jpg.webp",
          name: "冬奥会个性化邮票长卷珍藏套装",
          price: 398.0
        },
        {
          img:
            "https://bic.11185.cn/zxpt-sc-sys/news/975_1641352944086_955_SYS_097.jpg.webp",
          name: "冬奥会个性化邮票长卷珍藏套装",
          price: 398.0
        },
        {
          img:
            "https://bic.11185.cn/zxpt-sc-sys/news/723_1635909552430_316_SYS_158.jpg.webp",
          name: "冬奥会个性化邮票长卷珍藏套装",
          price: 398.0
        }
      ]
    };
  },

  mounted() {},
  methods: {
    // slide(data) {
    //   console.log(data);
    // },
    // onTap(data) {
    //   console.log(data);
    // },
    // onInit(data) {
    //   console.log(data);
    // },
    toList() {
      this.$router.push({
        path: "/details",
        name: "details",
        query: {
          msgKey: this.keyWord
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/gloab.css";
@import "../assets/css/index.css";
</style>
