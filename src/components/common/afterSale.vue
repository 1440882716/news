<template>
  <div class="my-info">
    <msgBox ref="tips"></msgBox>
    <div class="info-content font12">
      <span>售后订单</span>
    </div>
  </div>
</template>
<script>
import { addInvoice, updInvoice, pageData, delInvoice } from "@/api/invoice";
import msgBox from "./msg.vue";
export default {
  name: "mycard",
  components: {
    msgBox
  },
  data() {
    return {};
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let data = {
        // page: this.page,
        // limit: this.limit
      };
      pageData(data).then(res => {
        if (res.code == 200) {
          //   this.invoiceList = res.data;
        }
      });
    }
  }
};
</script>
<style scoped>
.info-content {
  width: 100%;
}
.title-box {
  border-bottom: 2px solid #e5e5e5;
}
.my-info-title {
  width: 140px;
  padding-bottom: 8px;
}
.my-info-box {
  width: 100%;
  min-height: 300px;
  margin-top: 10px;
  background: url("../../assets/img/emptyInvoice.png") center center no-repeat;
  background-size: 300px 300px;
  text-align: center;
  /* padding-top: 500px; */
}
</style>
