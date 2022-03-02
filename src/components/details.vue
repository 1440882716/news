<template>
  <div class="container">
    <!-- 寒假快乐和 -->
    <Header></Header>
    <div class="content p-b-80">
      <div class="goods-box flex-r flex-b m-t-10">
        <div class="goods-left">
          <div class="big-img-box">
            <Magnifier :imgList="imgList"></Magnifier>
          </div>
        </div>
        <div class="goods-right text-left">
          <div class="font24 m-b-20 bold-font">{{ goodsData.name }}</div>
          <span class="tips-color font16">{{ goodsData.description }}</span>
          <div class="price-box flex-r">
            <div class="font14 tips-color price-title">
              {{ goodsData.price }}
            </div>
            <div class="m-l-20">
              <div>
                <span class="font14 price-main">¥</span>
                <span class="price-main bold600 font28">258.00</span>
                <span class="font14 tips-color"
                  >(由于休合刊等原因，实际价格以下单时的核算价为准)</span
                >
              </div>
              <div class="flex-r font14 m-t-10">
                <div>
                  <span>单价：</span>
                  <span class="price-main">¥1.80</span>
                </div>
                <div class="m-l-20">
                  <span>年价：</span>
                  <span class="price-main">¥288.00</span>
                </div>
              </div>
            </div>
          </div>
          <div class="font14 tips-color">
            <div class="flex-r details-item m-t-20">
              <div class="details-item-left">年度：</div>
              <div class="right-box1">2022</div>
            </div>
            <div class="flex-r details-item m-t-20">
              <div class="details-item-left">订阅选择：</div>
              <div class="right-box1">自选定期</div>
            </div>
            <div class="flex-r details-item m-t-20">
              <div class="details-item-left">配送至：</div>
              <div>
                <el-cascader
                  v-model="region"
                  :options="regionData"
                  :props="{
                    checkStrictly: true,
                    expandTrigger: 'hover',
                    value: 'id',
                    label: 'ext_name',
                    children: 'childs'
                  }"
                  @change="handleChange"
                ></el-cascader>
              </div>
            </div>
            <div class="flex-r details-item m-t-20">
              <div class="details-item-left">起期：</div>
              <div>
                <el-date-picker
                  v-model="dateStart"
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
                  v-model="dateEnd"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </div>
            </div>
            <div class="flex-r details-item m-t-20">
              <div class="details-item-left">数量：</div>
              <div>
                <el-input-number
                  v-model="goodsNum"
                  @change="handleChange"
                  :min="1"
                  :max="10"
                  label="描述文字"
                ></el-input-number>
              </div>
            </div>
            <div class="flex-r details-item m-t-20">
              <div class="details-item-left">期数：</div>
              <div class="">315 期</div>
            </div>
          </div>
          <!-- 加购物车/立即购买 -->
          <div class="flex-r buy-box">
            <div class="add-cart-box font14 pointer">加入购物车</div>
            <div class="buy-first font14 fff-font pointer">加入购物车</div>
          </div>
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="m-t-40">
        <div class="detail-headline">
          <div class="de-head-text">商品详情</div>
        </div>
        <div class="de-item-box">
          <el-descriptions title="">
            <el-descriptions-item label="全国统一刊号">{{
              goodsData.paperNum
            }}</el-descriptions-item>
            <el-descriptions-item label="报刊种类">报纸</el-descriptions-item>
            <el-descriptions-item label="刊期">{{
              goodsData.cycleName
            }}</el-descriptions-item>
            <el-descriptions-item label="单价">{{
              goodsData.price
            }}</el-descriptions-item>
            <!-- <el-descriptions-item label="邮发代号">1-1</el-descriptions-item> -->
            <el-descriptions-item label="出版日期">{{
              goodsData.createTime
            }}</el-descriptions-item>
            <el-descriptions-item label="出版社名称">{{
              goodsData.press
            }}</el-descriptions-item>
            <!-- <el-descriptions-item label="收订种类">
              按期
            </el-descriptions-item> -->
            <el-descriptions-item label="年价">288.0</el-descriptions-item>
            <el-descriptions-item label="商品编号">{{
              goodsData.id
            }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "./common/header.vue";
import Footer from "./common/footer.vue";
import Magnifier from "../components/common/magnifier.vue";
import region from "../assets/data/area_format_user.json";
import { goodsDetails } from "@/api/goods";
export default {
  components: {
    Header,
    Footer,
    Magnifier
  },
  name: "goods",
  data() {
    return {
      goodsId: "",
      goodsData: {},
      regionData: region,
      region: "",
      dateStart: "",
      dateEnd: "",
      goodsNum: 1,
      imgList: [
        "https://bic.11185.cn/zxpt-sc-pub/zxptpub/bk_bucket/20220214094511228_3_share.jpg.webp",
        "https://bic.11185.cn/zxpt-sc-pub/zxptpub/bk_bucket/20220214094515217_1_share.jpg.webp",
        "https://bic.11185.cn/zxpt-sc-pub/zxptpub/bk_bucket/20220214094519332_2_share.jpg.webp",
        "https://bic.11185.cn/zxpt-sc-pub/zxptpub/bk_bucket/20220214094511228_3_share.jpg.webp",
        "https://bic.11185.cn/zxpt-sc-pub/zxptpub/bk_bucket/20220214094515217_1_share.jpg.webp",
        "https://bic.11185.cn/zxpt-sc-pub/zxptpub/bk_bucket/20220214094519332_2_share.jpg.webp",
        "https://bic.11185.cn/zxpt-sc-pub/zxptpub/bk_bucket/20220214094511228_3_share.jpg.webp",
        "https://bic.11185.cn/zxpt-sc-pub/zxptpub/bk_bucket/20220214094515217_1_share.jpg.webp",
        "https://bic.11185.cn/zxpt-sc-pub/zxptpub/bk_bucket/20220214094519332_2_share.jpg.webp"
      ]
    };
  },
  created() {
    this.goodsId = this.$route.query.goodsId;
    this.getDetails();
    // console.log(this.msg);
    // debugger;
  },
  mounted() {},
  methods: {
    handleChange(value) {
      console.log(value);
    },
    getDetails() {
      goodsDetails({ id: this.goodsId }).then(res => {
        if (res.code == 200) {
          this.goodsData = res.data;
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
