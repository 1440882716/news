<template>
  <div class="container">
    <Header></Header>

    <!-- 购物车不为空 -->
    <div class="content p-b-80" v-if="hasGoods">
      <div class="cart-box">
        <div class="cart-head flex-r flex-b">
          <div class="font18 main-color">全部商品{{ countNum }}</div>
          <div class="font14 flex-r">
            已选商品不含运费：<span class="price-color">¥{{ countPrice }}</span>
            <div class="count-btn fff-font font12">结算</div>
          </div>
        </div>
        <!-- 购物车列表 -->
        <div class="goods-list m-b-40">
          <!-- head -->
          <div class="goods-list-head m-b-10 main-color">
            <ul class="flex-r font14">
              <li class="headline1 text-left">
                <img
                  class="choose-cart-icon m-l-20 m-t-5"
                  src="../assets/img/choosed.png"
                  alt=""
                />
                <span class="m-l-10">全选</span>
              </li>
              <li class="headline2 text-left">商品信息</li>
              <li class="headline3">单价</li>
              <li class="headline4">数量</li>
              <li class="headline5">小计</li>
              <li class="headline6">操作</li>
            </ul>
          </div>
          <!-- list -->
          <div class="cart-list flex-r font14" v-for="item in goodsList">
            <div class="flex-r headline1">
              <img
                class="choose-cart-icon m-l-30"
                src="../assets/img/choosed.png"
                alt=""
              />
              <div class="cart-goods-img">
                <img :src="item.img" alt="" />
              </div>
            </div>

            <div class="flex-r headline2 flex-b">
              <div class="goods-name font14 text-left">{{ item.name }}</div>
              <div class="goods-info font12 gray-font-color">
                <p style="text-align: left;">
                  <span class="justify">年度:</span>
                  <span>2022</span>
                </p>
                <p style="text-align: left;">
                  <span class="justify">订阅选择:</span>
                  <span>自选定期</span>
                </p>
                <p style="text-align: left;">
                  <span class="justify">起止日期:</span>
                  <span>2022-02-21~2022-12-31</span>
                </p>
                <p style="text-align: left;">
                  <span class="justify">期数:</span>
                  <span>314</span>
                </p>
                <p style="text-align: left;">
                  <span class="justify">刊期:</span>
                  <span>0221~1231</span>
                </p>
              </div>
            </div>
            <div class="headline3 font12">123.20</div>
            <div class="headline4 flex">
              <div class="flex-r change-num">
                <div class="num-btn num-reduse">-</div>
                <input
                  v-model="item.num"
                  class="cart-goods-num main-color"
                  type="number"
                />
                <div class="num-btn num-add">+</div>
              </div>
            </div>
            <div class="headline5 price-color font16 bold600">¥123.20</div>
            <div class="headline6">删除</div>
          </div>
          <!-- count -->
          <div class="count-box flex-r felx-b font14 main-color">
            <div class="count-left text-left">
              <img
                class="choose-cart-icon m-l-20 m-t-5"
                src="../assets/img/choosed.png"
                alt=""
              />
              <span class="m-l-10">全选</span>
              <span>删除选中的商品</span>
            </div>
            <div class="count-right flex-r flex-e">
              <div class="m-r-20">
                已选商品<span class="font18 bold-font price-color">0</span>件
              </div>
              <div class="m-r-10">
                合计（不含运费）：<span class="bold600 font16 price-color"
                  >¥{{ countPrice }}</span
                >
              </div>
              <div class="list-count fff-font">结算</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 空页面 -->
    <div class="empty" v-else>
      <div class="font18 bold-font">您的购物车是空的！快去挑选几件吧</div>
      <div class="font14 go-home m-t-30">去逛逛</div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./common/header.vue";
import Footer from "./common/footer.vue";
export default {
  name: "login",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      countNum: 0,
      countPrice: 0,
      hasGoods: true,
      goodsList: [
        {
          img:
            "https://bic.11185.cn/zxpt-sc-cnt/upload/1/1-83/20151106152915_1.jpg",
          name: "人民日报海外版2022自选定期",
          num: 222
        },
        {
          img:
            "https://bic.11185.cn/zxpt-sc-cnt/upload/1/1-96/20120828200025_1.jpg",
          name: "人民日报海外版2022自选定期",
          num: 222
        },
        {
          img:
            "https://bic.11185.cn/zxpt-sc-pub/zxptpub/bk_bucket/20220214094511228_3_small.jpg.webp",
          name: "人民日报海外版2022自选定期",
          num: 222
        },
        {
          img:
            "https://bic.11185.cn/zxpt-sc-cnt/upload/1/1-96/20120828200025_1.jpg",
          name: "人民日报海外版2022自选定期",
          num: 222
        }
      ]
    };
  },

  mounted() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/gloab.css";
@import "../assets/css/cart.css";
</style>
