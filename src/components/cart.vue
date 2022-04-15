<template>
  <div class="container" style="height: 100%;position: relative;">
    <msgBox ref="tips"></msgBox>
    <Header></Header>
    <!-- 购物车不为空 -->
    <div class="content p-b-80" v-if="goodsList.length != 0">
      <div class="cart-box">
        <div class="cart-head flex-r flex-b">
          <div class="font18 main-color">
            全部商品
            <span class="myActiveColor">{{ this.goodsList.length }}</span>
          </div>
          <div class="font14 flex-r">
            已选商品不含运费：<span class="price-color">¥ {{ allPrice }}</span>
            <div class="count-btn fff-font font12 pointer" @click="toConfirm">
              结算
            </div>
          </div>
        </div>
        <!-- 购物车列表 -->
        <div class="goods-list m-b-40">
          <!-- head -->
          <div class="goods-list-head m-b-10 main-color">
            <ul class="flex-r font14">
              <li
                class="headline1 flex-r text-left"
                @click="selectfun(selectAll)"
              >
                <div>
                  <img
                    v-show="selectAll"
                    class="choose-cart-icon m-l-20 m-t-5"
                    src="../assets/img/choosed.png"
                    alt=""
                  />
                  <img
                    v-show="!selectAll"
                    class="choose-cart-icon m-l-20 m-t-5"
                    src="../assets/img/not-choose.png"
                    alt=""
                  />
                </div>
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
              <div class="pointer" @click="changeActive(item)">
                <img
                  v-show="item.select"
                  class="choose-cart-icon m-l-30"
                  src="../assets/img/choosed.png"
                  alt=""
                />
                <img
                  v-show="!item.select"
                  class="choose-cart-icon m-l-30"
                  src="../assets/img/not-choose.png"
                  alt=""
                />
              </div>
              <!-- 商品图片 -->
              <div class="cart-goods-img pointer" @click="toDetail(item)">
                <img :src="item.pics" alt="" />
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
                    <div class="right-box1">{{ item.paperYear }}</div>
                  </div>
                  <div class="flex-r details-item m-t-20">
                    <div class="details-item-left">订阅选择：</div>
                    <div class="right-box1">自选定期</div>
                  </div>
                  <div class="flex-r details-item m-t-20">
                    <div class="details-item-left">起期：</div>
                    <div>
                      <el-date-picker
                        value-format="yyyy-MM-dd"
                        v-model="item.startrTime"
                        type="date"
                        :picker-options="pickerOptions1"
                        placeholder="选择日期"
                        @change="changeStart(item)"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="flex-r details-item m-t-20">
                    <div class="details-item-left">止期：</div>
                    <div>
                      <el-date-picker
                        value-format="yyyy-MM-dd"
                        v-model="item.endTime"
                        type="date"
                        :picker-options="pickerOptions2"
                        placeholder="选择日期"
                        @change="changeEnd(item)"
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
                  <span>{{ item.paperYear }}</span>
                </p>
                <p style="text-align: left;">
                  <span class="justify">订阅选择:</span>
                  <span>自选定期</span>
                </p>
                <p style="text-align: left;">
                  <span class="justify">起止日期:</span>
                  <span>{{ item.startrTime }}~{{ item.endTime }}</span>
                </p>
                <p style="text-align: left;">
                  <span class="justify">期数:</span>
                  <span>{{ item.periodNum }}</span>
                </p>
                <!-- <p style="text-align: left;">
                  <span class="justify">刊期:</span>
                  <span>0221~1231</span>
                </p> -->
              </div>
            </div>
            <div class="headline3 font12">{{ item.price }}</div>
            <div class="headline4 flex">
              <el-input-number
                v-model="item.quantity"
                @change="changeNum(item)"
                :min="1"
                size="mini"
                label="描述文字"
              ></el-input-number>
              <!-- <div class="flex-r change-num">
                <div class="num-btn num-reduse" >-</div>
                <input
                  v-model="item.num"
                  class="cart-goods-num main-color"
                  type="number"
                />
                <div class="num-btn num-add">+</div>
              </div> -->
            </div>
            <div class="headline5 price-color font16 bold600">
              {{ item.count }}
            </div>
            <!-- <div class="headline6">
              <el-popover placement="right" width="160" v-model="visible">
                <p>这是一段内容这是一段内容确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false"
                    >取消</el-button
                  >
                  <el-button type="primary" size="mini" @click="visible = false"
                    >确定</el-button
                  >
                </div>
                <el-button slot="reference">删除</el-button>
              </el-popover>
            </div> -->
            <!--  -->
            <div class="headline6 pointer" @click="delItem(item)">删除</div>
          </div>
          <!-- count -->
          <div class="count-box flex-r felx-b font14 main-color">
            <div class="count-left flex-r text-left">
              <div class="m-t-5 pointer" @click="selectfun(selectAll)">
                <img
                  v-show="selectAll"
                  class="choose-cart-icon m-l-20 m-t-5"
                  src="../assets/img/choosed.png"
                  alt=""
                />
                <img
                  v-show="!selectAll"
                  class="choose-cart-icon m-l-20 m-t-5"
                  src="../assets/img/not-choose.png"
                  alt=""
                />
              </div>
              <span class="m-l-10 m-r-10">全选</span>
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
                  >¥{{ allPrice }}</span
                >
              </div>
              <div class="list-count fff-font pointer" @click="toConfirm">
                结算
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 空页面 -->
    <div class="empty empty-cart m-t-30 m-b-80" v-else>
      <el-empty>
        <!-- <el-button type="primary">按钮</el-button> -->
        <router-link to="/" class="m-l-10" style="text-decoration: none;">
          <div class="font14 go-home m-t-30 pointer">去逛逛</div>
        </router-link>
      </el-empty>
    </div>
    <Footer style="position: absolute;bottom: 0;"></Footer>
  </div>
</template>

<script>
import Header from "./common/header.vue";
import Footer from "./common/footer.vue";
import msgBox from "./common/msg.vue";
import { reckon } from "@/api/goods";
import { cartList, updateCart, delCart } from "@/api/cart";
export default {
  name: "login",
  components: {
    Header,
    Footer,
    msgBox
  },
  data() {
    return {
      hasGoods: true,
      visible: false,
      selectAll: false,
      allPrice: 0,
      goodsList: [],
      pickerOptions1: {
        disabledDate(time) {
          return (
            time.getTime() < Date.now() - 8.64e7 ||
            time.getFullYear() < new Date(time).getFullYear()
          );
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          // let nowDate = new Date();
          // let year = nowDate.getFullYear();
          // let end_time = `${year}-12-31`;
          // end_time = new Date(end_timenew).getTime();
          // return time.getTime() < end_time;
          return (
            time.getTime() < Date.now() - 8.64e7 ||
            time.getFullYear() < new Date(time).getFullYear()
          );
        }
      }
    };
  },
  computed: {
    countNum: function() {
      let select_goods = this.goodsList.filter(item => {
        return item.select;
      });
      let num = select_goods.length;
      return num;
    }
    // countPrice: function() {
    //   let count = 0;
    //   let select_goods = this.goodsList.filter(item => {
    //     return item.select;
    //   });
    //   let price = select_goods.map(item => {
    //     count += item.price * item.num;
    //     return count;
    //   });
    //   return price[price.length - 1].toFixed(2);
    // }
  },
  created() {
    this.getData();
    // this.setActive();
  },
  methods: {
    // 购物车数据
    getData() {
      cartList().then(res => {
        if (res.code == 200) {
          this.goodsList = res.data;
          this.goodsList.map(item => {
            let count = (item.price * 1 * item.quantity).toFixed(2);
            this.$set(item, "count", count);
            this.$set(item, "select", false);
          });
        }
      });
    },
    // 修改购物车
    updateCartItem(starttime, endtime, quantity, number, price, id) {
      let data = {
        startTime: starttime,
        endTime: endtime,
        quantity: quantity,
        periodNum: number,
        price: price,
        id: id
      };
      updateCart(data).then(res => {});
    },
    // 获取期数
    getNewsNum(paperid, start, endtime, price) {
      reckon({
        id: paperid,
        startTime: start,
        endTime: endtime
      }).then(res => {
        if (res.code == 200) {
          // if (res.data == 0) {
          // this.$refs.tips.toast("期数不能为0");
          // } else {
          // 拿到期数，计算单价、总价
          for (let i = 0; i < this.goodsList.length; i++) {
            if (paperid == this.goodsList[i].paperId) {
              this.goodsList[i].periodNum = res.data;
              this.goodsList[i].price = (price * res.data).toFixed(2);
              this.goodsList[i].count = (
                this.goodsList[i].price * this.goodsList[i].quantity
              ).toFixed(2);
              this.updateCartItem(
                start,
                endtime,
                this.goodsList[i].quantity,
                res.data,
                this.goodsList[i].price,
                this.goodsList[i].id
              );
            }
          }
          // }
        }
      });
    },
    // 改变起订日期
    changeStart(info) {
      console.log(info);
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      let thisYear = year + "-" + "12-31";
      let a = Date.parse(info.startrTime);
      let b = Date.parse(thisYear);
      if (a < b) {
        this.getNewsNum(
          info.paperId,
          info.startrTime,
          info.endTime,
          info.paperPrice
        );
      } else {
        this.$refs.tips.toast("只能在今年内选择订阅开始时间");
        info.startrTime = thisYear;
        this.getNewsNum(
          info.paperId,
          info.startrTime,
          info.endTime,
          info.paperPrice
        );
      }
    },
    // 改变订阅结束日期
    changeEnd(info) {
      console.log(info);
      // debugger;
      // return;
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      let thisYear = year + "-" + "12-31";
      let a = Date.parse(info.endTime);
      let b = Date.parse(thisYear);
      if (a < b) {
        this.getNewsNum(
          info.paperId,
          info.startrTime,
          info.endTime,
          info.paperPrice
        );
      } else {
        this.$refs.tips.toast("只能在今年内选择订阅结束时间");
        info.endTime = thisYear;
        this.getNewsNum(
          info.paperId,
          info.startrTime,
          info.endTime,
          info.paperPrice
        );
      }
    },
    // 遍历购物车数据添加是否选中状态
    setActive() {
      this.goodsList.map(item => {
        this.$set(item, "select", false);
        // let count = (item.price * 1 * item.num).toFixed(2);
        // this.$set(item, "count", count);
      });
      // 购物车总价
      this.allPrice = this.getTotalPrice();
    },
    // 计算总价
    getTotalPrice() {
      let select_goods = this.goodsList.filter(item => {
        return item.select;
      });
      console.log(select_goods);
      // debugger;
      let goodsCount = 0;
      for (let i = 0; i < select_goods.length; i++) {
        goodsCount += select_goods[i].price * 1 * select_goods[i].quantity;
      }
      return goodsCount.toFixed(2);
    },
    // 商品选中和反选
    changeActive(info) {
      info.select = !info.select;
      console.log(info);
      // 是否全选
      this.selectAll = this.isSelectAll();
      // 计算总价
      this.allPrice = this.getTotalPrice();
    },
    // 是否全选
    isSelectAll() {
      if (this.goodsList.length === 0) {
        return false;
      }
      return this.goodsList.every(item => {
        return item.select;
      });
    },
    // 全选
    selectfun(is_select) {
      this.goodsList.forEach(item => {
        return (item.select = !is_select);
      });
      this.selectAll = this.isSelectAll();
      this.allPrice = this.getTotalPrice();
      console.log(this.allPrice);
    },
    // 单项数量变化
    changeNum(item) {
      console.log(item);
      for (let i = 0; i < this.goodsList.length; i++) {
        if (item.id == this.goodsList[i].id) {
          this.goodsList[i].count = (
            this.goodsList[i].price *
            1 *
            this.goodsList[i].quantity
          ).toFixed(2);
          this.updateCartItem(
            item.startrTime,
            item.endTime,
            item.quantity,
            item.periodNum,
            item.price,
            item.id
          );
        }
      }
      this.selectAll = this.isSelectAll();
      this.allPrice = this.getTotalPrice();
      console.log(this.allPrice);
      // debugger;
    },
    // 删除
    delItem(info) {
      //  open() {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delCart({ id: info.id }).then(res => {
            if (res.code == 200) {
              this.$refs.tips.toast(res.msg);
              this.getData();
            } else {
              this.$refs.tips.toast(res.msg);
            }
          });
        })
        .catch(() => {});
      // }
    },
    // 商品详情
    toDetail(info) {
      // console.log(info);
      // debugger;
      // return;
      this.$router.push({
        path: "/details",
        name: "details",
        query: {
          goodsId: info.paperId
        }
      });
    },

    toConfirm() {
      if (this.countNum == 1) {
        let select_goods = this.goodsList.filter(item => {
          return item.select;
        });
        let idArr = select_goods.map(item => {
          return item.id;
        });
        let idStr = idArr.join(",");
        // let a = new Date(select_goods[0].startrTime).getTime();
        // let b = new Date().getTime();
        // if (a > b) {
        this.$router.push({
          path: "/confirmOrder",
          name: "confirmOrder",
          query: {
            goodsId: idStr
          }
        });
        // } else {
        //   this.$refs.tips.toast("请重新选择报刊的起订时间");
        // }
      } else if (this.countNum > 1) {
        this.$refs.tips.toast("只能选择一个商品下单");
      } else {
        this.$refs.tips.toast("请选择一个商品下单");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/gloab.css";
@import "../assets/css/cart.css";
</style>
