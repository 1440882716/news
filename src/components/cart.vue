<template>
  <div class="container">
    <Header></Header>

    <!-- 购物车不为空 -->
    <div class="content p-b-80" v-if="hasGoods">
      <div class="cart-box">
        <div class="cart-head flex-r flex-b">
          <div class="font18 main-color">
            全部商品 <span class="myActiveColor">{{ countNum }}</span>
          </div>
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
              <div class="goods-info font12 gray-font-color change-buy-info">
                <el-popover
                  placement="bottom"
                  width="300"
                  trigger="click"
                  style="position: absolute;top: 0;right: 0;"
                >
                  <div class="flex-r details-item m-t-20">
                    <div class="details-item-left">年度：</div>
                    <div class="right-box1">2022</div>
                  </div>
                  <div class="flex-r details-item m-t-20">
                    <div class="details-item-left">订阅选择：</div>
                    <div class="right-box1">自选定期</div>
                  </div>
                  <div class="flex-r details-item m-t-20">
                    <div class="details-item-left">起期：</div>
                    <div>
                      <el-date-picker
                        v-model="item.dateStart"
                        type="date"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="flex-r details-item m-t-20">
                    <div class="details-item-left">止期：</div>
                    <div>
                      <el-date-picker
                        v-model="item.dateEnd"
                        type="date"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                  <!-- <div>
                    <el-button size="mini" type="text" @click="visible = false"
                      >取消</el-button
                    >
                    <el-button
                      type="primary"
                      size="mini"
                      @click="visible = false"
                      >确定</el-button
                    >
                  </div> -->
                  <el-button
                    slot="reference"
                    style="color: white;background-color: #f60;padding: 3px;border-radius: 0;font-size: 12px;"
                    >修改</el-button
                  >
                </el-popover>
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
            <div class="headline3 font12">{{ item.price }}</div>
            <div class="headline4 flex">
              <el-input-number
                v-model="item.num"
                @change="changeNum()"
                :min="1"
                size="mini"
                label="描述文字"
              ></el-input-number>
              <!-- <div class="flex-r change-num">
                <div class="num-btn num-reduse">-</div>
                <input
                  v-model="item.num"
                  class="cart-goods-num main-color"
                  type="number"
                />
                <div class="num-btn num-add">+</div>
              </div> -->
            </div>
            <div class="headline5 price-color font16 bold600">¥123.20</div>
            <div class="headline6 pointer">删除</div>
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
                已选商品<span class="font18 bold-font price-color">
                  {{ countNum }} </span
                >件
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
      // countNum: 0,
      // countPrice: 0,
      hasGoods: true,
      visible: false,
      goodsList: [
        {
          img:
            "https://bic.11185.cn/zxpt-sc-cnt/upload/1/1-83/20151106152915_1.jpg",
          name: "人民日报海外版2022自选定期",
          price: 123.2,
          count: 123.2,
          num: 1,
          dateStart: "",
          dateEnd: ""
        },
        {
          img:
            "https://bic.11185.cn/zxpt-sc-cnt/upload/1/1-96/20120828200025_1.jpg",
          name: "人民日报海外版2022自选定期",
          price: 123.2,
          count: 123.2,
          num: 1,
          dateStart: "",
          dateEnd: ""
        },
        {
          img:
            "https://bic.11185.cn/zxpt-sc-pub/zxptpub/bk_bucket/20220214094511228_3_small.jpg.webp",
          name: "人民日报海外版2022自选定期",
          price: 123.2,
          count: 123.2,
          num: 2,
          dateStart: "",
          dateEnd: ""
        },
        {
          img:
            "https://bic.11185.cn/zxpt-sc-cnt/upload/1/1-96/20120828200025_1.jpg",
          name: "人民日报海外版2022自选定期",
          price: 123.2,
          count: 123.2,
          num: 1,
          dateStart: "",
          dateEnd: ""
        }
      ]
    };
  },
  computed: {
    countNum: function() {
      let num = this.goodsList.length;
      return num;
    },
    countPrice: function() {
      let count = 0;
      let price = this.goodsList.map(item => {
        count += item.price * item.num;
        return count;
      });
      return price[price.length - 1].toFixed(2);
    }
  },
  mounted() {},
  methods: {
    changeNum(e) {
      // console.log(item);
      console.log(e);
      debugger;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/gloab.css";
@import "../assets/css/cart.css";
</style>
