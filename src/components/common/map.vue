<template>
  <div class="mapbox">
    <baidu-map
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
      style="height:490px;width: 600px;margin-left: 40px;"
      @ready="handler"
      @click="getClickInfo"
    >
      <!-- 必须给容器指高度，不然地图将显示在一个高度为0的容器中，看不到 -->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <bm-marker
        :position="markerPo"
        :dragging="true"
        :zIndex="999999999"
        @dragend="dragend"
      >
        <bm-info-window :show="isShowInfo">{{ address }}</bm-info-window>
      </bm-marker>
    </baidu-map>
    <!-- 因为我采用的是全局注册，所以不用再在该页面上注册components -->
  </div>
</template>
<script>
export default {
  name: "mapbox",
  data() {
    return {
      center: { lng: 104.07, lat: 30.67 }, //经纬度
      zoom: 13, //地图展示级别
      markerPo: {
        lat: 30.67,
        lng: 104.07
      },

      isShowPanel: true,

      isShowInfo: false,

      markerIcon: "", //标注图片

      address: ""
    };
  },
  methods: {
    handler({ BMap, map }) {
      // console.log(BMap, map);
      this.center.lng = 104.07;
      this.center.lat = 30.67;
      this.zoom = this.zoom;
    },
    getClickInfo(e) {
      let that = this;
      let geocoder = new BMap.Geocoder();
      // 转成百度坐标
      that.markerPo = new BMap.Point(e.point.lng, e.point.lat);
      geocoder.getLocation(that.markerPo, res => {
        that.address = res.address;
        that.$emit("getAddFun", res.address);
      });
    },
    dragend(val) {
      //标注拖拽完成获取坐标信息
      this.markerPo = val.point;
      let geocoder = new BMap.Geocoder(); //创建地址解析器的实例
      geocoder.getLocation(val.point, rs => {
        this.address = rs.address;
      });
    }
  }
};
</script>
