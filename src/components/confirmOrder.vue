<template>
  <div class="container">
    <msgBox ref="tips"></msgBox>
    <Header></Header>
    <!-- 新增地址弹框 -->
    <addAddress
      ref="openBox"
      :addData="addressList"
      :upData="itemAddress"
      @changeData="setData($event)"
    ></addAddress>
    <div class="confirm-box p-b-80">
      <div class="text-left tips-title main-color">填写并核对订单信息</div>
      <div class="confirm-content main-color font14">
        <router-link to="./cart" style="text-decoration: none;">
          <div class="font14 pointer text-right">返回修改购物车</div>
        </router-link>

        <div class="confirm-title flex-r flex-b m-t-10">
          <span class="bold-font">收货人信息</span>
          <span class="myActiveColor pointer bold-font" @click="openAddBox"
            >新增收货地址</span
          >
        </div>
        <!-- 收货地址 -->
        <div class="text-left address-content ">
          <div v-if="addressList.length == 0">
            <span>获取地址失败或暂无收货地址</span>
            <div class="add-address-box pointer" @click="openAddBox">
              您还没有收货地址，赶快设置一个吧
            </div>
          </div>
          <div class="address-list-box f666" v-else>
            <div
              class="add-item-box flex-r flex-b"
              v-for="(item, index) in addressList"
              :key="index"
            >
              <div class="add-left flex-r">
                <div
                  class="m-r-10 font18 pointer"
                  @click="chooseAdd(index, item)"
                >
                  <i
                    :class="[
                      'el-icon-success',
                      ind == index ? 'myActiveColor' : 'f999'
                    ]"
                  ></i>
                  <!-- <img
                    class="choose-cart-icon m-l-20 m-t-5"
                    src="../assets/img/choosed.png"
                    alt=""
                  />
                  <img
                    class="choose-cart-icon m-l-20 m-t-5"
                    src="../assets/img/not-choose.png"
                    alt=""
                  /> -->
                </div>
                <div class="m-r-10 ">{{ item.name }}</div>
                <div class="m-r-10 address-text">
                  {{ item.area }} {{ item.address }}
                </div>
                <div class="m-r-10">{{ item.mobile }}</div>
              </div>
              <!-- <div class="myActiveColor add-right text-right">
                <span class="m-r-20 pointer" @click="delAddFun(item.id)"
                  >删除</span
                >
              </div> -->
            </div>
          </div>
          <div class="order-box">
            <div class="confirm-title flex-r flex-b m-t-10 m-b-10">
              <span class="bold-font">订单列表</span>
            </div>
            <div
              class="cart-list flex-r font14 m-b-10"
              v-for="item in goodsList"
            >
              <div class="flex-r headline1">
                <!-- 商品图片 -->
                <div
                  class="cart-goods-img pointer"
                  @click="toDetail(item.paperId)"
                >
                  <img :src="item.pics" alt="" />
                </div>
              </div>
              <div class="flex-r headline2 flex-b">
                <div class="goods-name font14 text-left">{{ item.name }}</div>
                <div class="goods-info font12 gray-font-color change-buy-info">
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
              <div class="headline3 font14 f666 bold-font text-right">
                {{ item.price }}
              </div>
              <div class="headline4 font14 f666 bold-font text-right">
                x{{ item.quantity }}
              </div>
              <div class="headline5 price-color font16 bold600 text-right">
                {{ (item.price * item.quantity).toFixed(2) }}
              </div>
            </div>
            <div class="flex-r m-t-20">
              <div class="unitRemarks-title bold-font" style="width: 10%;">
                单位(必填)
              </div>
              <el-cascader
                v-model="region"
                :options="regionData"
                ref="cascaderHandle"
                :props="{
                  checkStrictly: true,
                  expandTrigger: 'hover',
                  value: 'ext_name',
                  label: 'ext_name',
                  children: 'childs'
                }"
                @change="closeCascader"
              ></el-cascader>
              <el-input
                style="width: 30%;"
                v-model="unitName"
                placeholder="单位/个人名称"
              ></el-input>
            </div>
            <!-- 订单备注 -->
            <div class="m-b-20 flex-r m-t-20">
              <div class="bold-font m-t-10" style="width: 10%;">订单备注</div>
              <el-input
                style="width: 53%;"
                class="m-t-10"
                type="textarea"
                :rows="4"
                placeholder="请输入备注"
                v-model="remark"
              >
              </el-input>
            </div>

            <div>
              <!-- 支付凭证 -->
              <!-- <span class="bold-font">上传线下支付凭证</span>
              <el-upload
                class="avatar-uploader m-t-20"
                :headers="{ Authorization: token }"
                action="https://admin.cdzkzs.top/client/order/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-error="uploadError"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="voucherImg" :src="voucherImg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload> -->
              <!-- 单位 -->
              <!-- <div class="flex-r m-t-30 m-b-20">
                <div class="unitRemarks-title">单位：</div>
                <el-input
                  class="remark-inp-order"
                  v-model="unitRemarks"
                  placeholder="请输入内容"
                ></el-input>
              </div> -->
              <!-- <div class="flex-r m-t-30 m-b-20">
                <div class="unitRemarks-title" style="width: 10%;">
                  单位(必填)：
                </div>
                <el-input style="width: 43%;"></el-input>
              </div> -->

              <!-- </div> -->

              <div class="flex-r m-b-20 m-t-20">
                <span class="bold-font">选择支付方式</span>

                <div class="pointer m-r-20 text-center" @click="payWay = 1">
                  <img
                    v-if="payWay == 1"
                    class="pay-box"
                    src="../assets/img/wx.png"
                    alt=""
                  />
                  <img
                    v-else
                    class="pay-box"
                    src="../assets/img/active-wx.png"
                    alt=""
                  />
                  <p>微信</p>
                </div>
                <div class="pointer m-r-20 text-center" @click="payWay = 2">
                  <img
                    v-if="payWay == 2"
                    class="pay-box"
                    src="../assets/img/zfbpay.png"
                    alt=""
                  />
                  <img
                    v-else
                    class="pay-box"
                    src="../assets/img/active-zfb.png"
                    alt=""
                  />
                  <p class="">支付宝</p>
                </div>
                <div class="pointer m-r-20 text-center" @click="payWayFun(3)">
                  <img
                    v-if="payWay == 3"
                    class="pay-box"
                    src="../assets/img/cardpay.png"
                    alt=""
                  />
                  <img
                    v-else
                    class="pay-box"
                    src="../assets/img/active-card.png"
                    alt=""
                  />
                  <p>银行卡</p>
                </div>
                <div class="pointer text-center" @click="payWay = 4">
                  <img
                    v-if="payWay == 4"
                    class="pay-box"
                    src="../assets/img/pz.png"
                    alt=""
                  />
                  <img
                    v-else
                    class="pay-box"
                    src="../assets/img/active-pz.png"
                    alt=""
                  />
                  <p>上传凭证</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-c flex-e m-t-20 f666">
        <div class="text-right m-b-10">
          <span class="font14 bold-font">共 </span>
          <span class="font14 bold-font myActiveColor">{{
            goodsList.length
          }}</span>
          <span class="font14 bold-font"> 件</span>
          <span class="font14 bold-font">合计：</span>
          <span class="font14 myActiveColor">¥ </span>
          <span class="font20 bold-font myActiveColor">{{ goodsCount }}</span>
        </div>
        <div class="text-right m-b-10">
          <span class="font14 bold-font">寄送至：</span
          ><span class="font14"
            >{{ itemAddress.area }} {{ itemAddress.address }}</span
          >
        </div>
        <div class="text-right m-b-10">
          <span class="font14 bold-font">收货人：</span
          ><span class="font14"
            >{{ itemAddress.name }} {{ itemAddress.mobile }}</span
          >
        </div>
        <div class="flex flex-e" @click="handleOrder">
          <div class="handle-order fff-font pointer">提交订单</div>
        </div>
        <img :src="qrImg" alt="" />
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "./common/header.vue";
import addAddress from "./common/addAddress.vue";
import Footer from "./common/footer.vue";
import msgBox from "./common/msg.vue";
import region from "../assets/data/area_format_user.json";
import { addList, delAdd } from "@/api/address";
import { getToken } from "@/utils/auth";
import { confirmUrl, createOrder, approve } from "@/api/cart";
import { cardList } from "@/api/card";
export default {
  name: "confirm",
  components: {
    Header,
    addAddress,
    Footer,
    msgBox
  },
  data() {
    return {
      isOpen: false,
      ind: 0,
      bankId: "",
      bankInd: -1,
      goodsId: "",
      goodsCount: 0,
      remark: "",
      token: "",
      payWay: -1,
      cardId: "",
      imgUrl: "",
      itemAddress: {},
      addressList: [],
      goodsList: [],
      cardData: [],
      qrImg: "",
      regionData: region,
      region: "",
      voucherImg: "",
      unitName: "",
      unitRemarks: ""
    };
  },
  created() {
    this.token = getToken();
    this.goodsId = this.$route.query.goodsId;
    this.getAddress();
    if (this.goodsId != "0") {
      this.getGoods();
    } else {
      this.getbuyFirst();
    }
  },
  methods: {
    chooseNav(ind) {
      this.navNum = ind;
    },
    getbuyFirst() {
      approve().then(res => {
        if (res.code == 200) {
          this.goodsList = res.data;
          this.goodsId = res.data[0].id;
          let count = 0;
          for (let i = 0; i < this.goodsList.length; i++) {
            count += this.goodsList[i].price * 1 * this.goodsList[i].quantity;
          }
          this.goodsCount = count.toFixed(2);
        }
      });
    },
    openAddBox() {
      this.$refs.openBox.openDialog();
    },
    getAddress() {
      addList().then(res => {
        if (res.code == 200) {
          this.addressList = res.data;
          for (let i = 0; i < this.addressList.length; i++) {
            if (this.addressList[i].is_default) {
              this.itemAddress = this.addressList[i];
              this.ind = i;
              return;
            } else {
              this.ind = -1;
              this.navNum = -1;
              this.itemAddress.id == "";
            }
          }
        }
      });
    },
    // 获取下订单的商品数据
    getGoods() {
      confirmUrl({ cartList: this.goodsId }).then(res => {
        if (res.code == 200) {
          this.goodsList = res.data;
          let count = 0;
          for (let i = 0; i < this.goodsList.length; i++) {
            count += this.goodsList[i].price * 1 * this.goodsList[i].quantity;
          }
          this.goodsCount = count.toFixed(2);
        }
      });
    },
    // 新增地址后关闭弹框 更新地址列表
    setData(msg) {
      this.addressList = msg;
      console.log(this.addressList);
      this.ind = 0;
      this.itemAddress = this.addressList[0];
      // debugger;
    },
    delAddFun(id) {
      delAdd({ id: id }).then(res => {
        if (res.code == 200) {
          this.getAddress();
        } else {
          this.$refs.tips.toast(res.msg);
        }
      });
    },
    chooseAdd(num, info) {
      this.ind = num;
      this.itemAddress = info;
    },
    payWayFun(num) {
      this.payWay = num;
      cardList().then(res => {
        if (res.code == 200) {
          this.cardData = res.data;
        } else {
        }
      });
    },
    chooseBank(info, ind) {
      this.bankInd = ind;
      this.bankId = info.id;
      // debugger;
    },
    // 上传凭证图片
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        // debugger;
        this.voucherImg = URL.createObjectURL(file.raw);
        this.voucherImg = res.location;
      } else {
        this.$refs.tips.toast(res.msg);
      }
    },
    uploadError(error, file, fileList) {
      let errorMsg = JSON.parse(error.message);
      // console.log(errorMsg);
      if (errorMsg.code == 401) {
        this.$router.push({
          path: "/login",
          name: "login"
        });
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$refs.tips.toast("上传头像图片只能是 JPG、png 格式!");
      }
      if (!isLt2M) {
        this.$refs.tips.toast("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 单位备注  选择省市区备注 关闭级联选择器
    closeCascader(e) {
      this.$refs.cascaderHandle.dropDownVisible = false;
      // console.log(e);
      // debugger;
    },
    handleOrder() {
      // debugger;
      // console.log(this.region);
      if (this.region.length != 0) {
        this.unitRemarks = this.region.join(" ") + this.unitName;
      }
      let data = {
        addId: this.itemAddress.id,
        cartList: this.goodsId,
        remarks: this.remark,
        imgUrl: this.voucherImg,
        payType: this.payWay,
        unitRemarks: this.unitRemarks
      };
      // console.log(data);
      // debugger;
      // return;
      if (this.itemAddress.id == "" || this.itemAddress.id == undefined) {
        this.$refs.tips.toast("请选择收货地址");
      } else if (this.goodsId == "") {
        this.$refs.tips.toast("商品出错啦~");
      } else if (this.region.length == 0 || this.unitName == "") {
        this.$refs.tips.toast("请填写单位");
      } else {
        createOrder(data).then(res => {
          if (res.code == 200) {
            this.$router.push({
              path: "/pay",
              name: "pay",
              query: {
                orderId: res.data,
                payWay: this.payWay,
                money: this.goodsCount,
                name: this.goodsList[0].name
              }
            });

            // 提交订单成功
            // this.$router.push({
            //   path: "/My",
            //   name: "My",
            //   query: {
            //     orderPage: 4
            //   }
            // });
          }
          // else if (res.code == 400) {
          //   // 完善个人信息中的地址
          //   this.$confirm("请完善个人信息中地址信息！", "提示", {
          //     confirmButtonText: "确定",
          //     cancelButtonText: "取消",
          //     type: "warning"
          //   })
          //     .then(() => {
          //       this.$router.push({
          //         path: "/My",
          //         name: "My",
          //         query: {
          //           orderPage: 0
          //         }
          //       });
          //     })
          //     .catch(() => {});
          // }
          else {
            this.$refs.tips.toast(res.msg);
          }
        });
      }
    },
    toDetail(id) {
      // console.log(id);
      // debugger;
      this.$router.push({
        path: "/details",
        name: "details",
        query: {
          goodsId: id
        }
      });
    }

    // 编辑地址
    // updAddFun(info) {
    //   this.itemAddress = info;
    //   this.$refs.openBox.openDialog();
    // }
  }
};
</script>
<style scoped>
@import "../assets/css/gloab.css";
@import "../assets/css/confirmOrder.css";
</style>
