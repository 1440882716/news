<template>
  <div class="msg-box">
    <div class="toast" v-show="toastShow">
      {{ toastText }}
    </div>
  </div>
</template>
<script>
export default {
  name: "msg",
  data() {
    return {
      toastShow: false,
      toastText: ""
    };
  },
  methods: {
    toast(str) {
      this.toastText = str;
      this.toastShow = true;
      setTimeout(() => {
        this.toastShow = false;
      }, 1500);
    }
  }
};
</script>
<style>
.toast {
  position: fixed;
  z-index: 2000;
  left: 50%;
  top: 45%;
  transition: all 0.5s;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  -o-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  border-radius: 5px;
  color: #fff;
  background: rgba(17, 17, 17, 0.7);
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
  max-width: 300px;
  z-index: 999;
}
</style>
