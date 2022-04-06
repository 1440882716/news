<template>
  <div class="container">
    <msgBox ref="tips"></msgBox>
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
          <div class="price-box-de flex-r">
            <!-- <div class="font14 tips-color price-title">
              {{ goodsData.price }}
            </div> -->
            <div class="m-l-20">
              <div>
                <span class="font14 price-main">¥</span>
                <span class="price-main bold600 font28">{{ countPrice }}</span>
                <span class="font14 tips-color"
                  >(由于休合刊等原因，实际价格以下单时的核算价为准)</span
                >
              </div>
              <div class="flex-r font14 m-t-10">
                <div>
                  <span>单价：</span>
                  <span class="price-main">¥{{ goodsData.price }}</span>
                </div>
                <div class="m-l-20">
                  <span>年价：</span>
                  <span class="price-main">¥{{ yearPrice }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="font14 tips-color">
            <div class="flex-r details-item m-t-20">
              <div class="details-item-left">年度：</div>
              <div class="right-box1">{{ yearTime }}</div>
            </div>
            <div class="flex-r details-item m-t-20">
              <div class="details-item-left">订阅选择：</div>
              <div class="right-box1">自选定期</div>
            </div>
            <!-- <div class="flex-r details-item m-t-20">
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
            </div> -->
            <div class="flex-r details-item m-t-20">
              <div class="details-item-left">起期：</div>
              <div>
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="dateStart"
                  type="date"
                  placeholder="选择日期"
                  @change="changeStart"
                >
                </el-date-picker>
              </div>
            </div>
            <div class="flex-r details-item m-t-20">
              <div class="details-item-left">止期：</div>
              <div>
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="dateEnd"
                  type="date"
                  placeholder="选择日期"
                  @change="changeEnd"
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
              <div class="">{{ goodsData.present }} 期</div>
            </div>
          </div>
          <!-- 加购物车/立即购买 -->
          <div class="flex-r buy-box">
            <div class="add-cart-box font14 pointer" @click="addGoods">
              加入购物车
            </div>
            <div class="buy-first font14 fff-font pointer" @click="buyFirst">
              立即购买
            </div>
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
            <el-descriptions-item label="报刊种类">{{
              goodsData.typeName
            }}</el-descriptions-item>
            <el-descriptions-item label="刊期">{{
              goodsData.cycleName
            }}</el-descriptions-item>
            <el-descriptions-item label="单价"
              >￥{{ goodsData.price }}</el-descriptions-item
            >
            <el-descriptions-item label="出版日期">{{
              goodsData.createTime
            }}</el-descriptions-item>
            <el-descriptions-item label="出版社名称">{{
              goodsData.press
            }}</el-descriptions-item>

            <el-descriptions-item label="年价"
              >￥{{
                (goodsData.price * goodsData.totalNum).toFixed(2)
              }}</el-descriptions-item
            >
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
import msgBox from "./common/msg.vue";
import region from "../assets/data/area_format_user.json";
import { goodsDetails, reckon } from "@/api/goods";
import { addCart, directBuy } from "@/api/cart";
export default {
  components: {
    Header,
    Footer,
    Magnifier,
    msgBox
  },
  name: "goods",
  data() {
    return {
      goodsId: "",
      thisDate: "",
      thisYear: "",
      yearTime: "",
      goodsData: {},
      regionData: region,
      region: "",
      dateStart: "",
      dateEnd: "",
      goodsNum: 1,
      yearPrice: 0,
      imgList: []
    };
  },
  computed: {
    countPrice: function() {
      let count = this.goodsData.price * this.goodsData.present;
      return count.toFixed(2);
    }
  },
  created() {
    this.goodsId = this.$route.query.goodsId;
    this.getDetails();
    this.getTime();
    // console.log(this.msg);
    // debugger;
  },
  mounted() {},
  methods: {
    handleChange(value) {
      console.log(value);
    },
    // 设置默认年显示日期
    getTime() {
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      var month =
        nowDate.getMonth() + 1 < 10
          ? "0" + (nowDate.getMonth() + 1)
          : nowDate.getMonth() + 1;
      var day =
        nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
      var dateStr = year + "-" + month + "-" + day;
      this.dateStart = dateStr;
      this.yearTime = year;
      this.thisYear = year + "-" + "12-31";
      this.dateEnd = year + "-" + "12-31";
      this.getNewsNum(this.goodsId, this.dateStart, this.dateEnd);
    },
    getDetails() {
      goodsDetails({ id: this.goodsId }).then(res => {
        if (res.code == 200) {
          this.goodsData = res.data;
          this.imgList = res.data.pictures;
          this.yearPrice = (
            this.goodsData.price * this.goodsData.totalNum
          ).toFixed(2);
        }
      });
    },
    getNewsNum(id, start, endtime) {
      reckon({
        id: id,
        startTime: start,
        endTime: endtime
      }).then(res => {
        if (res.code == 200) {
          this.goodsData.present = res.data;
        }
      });
    },
    // 改变起订日期
    changeStart(value) {
      let a = new Date(value).getTime();
      let b = new Date().getTime();
      if (a > b) {
        this.getNewsNum(this.goodsId, value, this.dateEnd);
      } else {
        this.$refs.tips.toast("开始订阅的日期不能小于当前日期");
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var month =
          nowDate.getMonth() + 1 < 10
            ? "0" + (nowDate.getMonth() + 1)
            : nowDate.getMonth() + 1;
        var day =
          nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
        var dateStr = year + "-" + month + "-" + day;
        this.dateStart = dateStr;
      }
    },
    // 改变订阅结束日期
    changeEnd(value) {
      // console.log(value);
      // console.log(this.thisYear);
      let a = Date.parse(value);
      let b = Date.parse(this.thisYear);
      if (a < b) {
        this.getNewsNum(this.goodsId, this.dateStart, value);
      } else {
        this.$refs.tips.toast("只能在今年内选择结束订阅时间");
        this.dateEnd = this.thisYear;
        this.getNewsNum(this.goodsId, this.dateStart, this.dateEnd);
      }
    },
    addGoods() {
      let data = {
        paperId: this.goodsId,
        paperYear: this.yearTime,
        startTime: this.dateStart,
        endTime: this.dateEnd,
        quantity: this.goodsNum,
        periodNum: this.goodsData.present,
        price: this.countPrice
      };
      addCart(data).then(res => {
        if (res.code == 200) {
          this.$router.push({
            path: "/cart"
          });
        } else {
          this.$refs.tips.toast(res.msg);
        }
      });
    },
    buyFirst() {
      let data = {
        paperId: this.goodsId,
        paperYear: this.yearTime,
        startTime: this.dateStart,
        endTime: this.dateEnd,
        quantity: this.goodsNum,
        periodNum: this.goodsData.present,
        price: this.countPrice
      };
      directBuy(data).then(res => {
        if (res.code == 200) {
          this.$router.push({
            path: "/confirmOrder",
            name: "confirmOrder",
            query: {
              goodsId: "0"
            }
          });
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
