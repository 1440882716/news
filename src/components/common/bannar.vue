<template>
  <!-- 制作一个框架包裹slider -->
  <div style="width:100%;height:100%"></div>
</template>
<script>
import slider from "vue-concise-slider"; // import slider components
export default {
  name: "bannar",
  //   el: "#app",
  data() {
    return {
      //Image list
      pages: [
        {
          title: "",
          style: {
            background:
              "url('https://bic.11185.cn/zxpt-sc-sys/news/906_1644653723588_696_SYS_817.jpg.webp')"
          }
        },
        {
          title: "",
          style: {
            background:
              "url('https://bic.11185.cn/zxpt-sc-sys/news/906_1644653723588_696_SYS_817.jpg.webp')"
          }
        },
        {
          title: "slide3",
          style: {
            background: "#4bbfc3"
          }
        }
      ],
      //Sliding configuration [obj]
      sliderinit: {
        currentPage: 0,
        thresholdDistance: 500,
        thresholdTime: 100,
        autoplay: 1000,
        loop: true,
        direction: "vertical",
        infinite: 1,
        slidesToScroll: 1,
        timingFunction: "ease",
        duration: 300
      }
    };
  },
  components: {
    slider: slider
  },
  methods: {
    // Listener event
    slide(data) {
      console.log(data);
    },
    onTap(data) {
      console.log(data);
    },
    onInit(data) {
      console.log(data);
    }
  }
};
</script>
