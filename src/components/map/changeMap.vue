<template>
  <div class="amap-page-container">
    <!-- 
    	zoom：放缩程度 , 
    	plugin：data中有定义，是一些插件，如工具栏等等，
    	center：定位经纬度位置
    	el-amap：高德地图组件
    -->
    <el-amap
      vid="amaps"
      :zoom="zoom"
      :plugin="plugin"
      :events="events"
      class="amap-demo"
      :center="center"
    >
      <el-amap-marker :position="center" vid="amapMarker"></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
export default {
  data() {
    let self = this;
    return {
      center: [121.59996, 31.197646],
      zoom: 17,
      lng: 0,
      lat: 0,
      loaded: false,
      events: {
        moveend: () => {},
        zoomchange: () => {},
        click: e => {
          this.center = [e.lnglat.lng, e.lnglat.lat];
          self.lng = e.lnglat.lng;
          self.lat = e.lnglat.lat;
        }
      },
      plugin: [
        //一些工具插件
        {
          pName: "Geolocation", //定位
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                console.log("修改定位");
                console.log("result", JSON.stringify(result));
                console.log("status", JSON.stringify(status));
                if (result.info == "SUCCESS" && status == "complete") {
                  console.log("修改定位的lng", self.lng);
                  console.log("修改定位的lat", self.lat);
                  console.log("地址", JSON.stringify(result.formattedAddress));
                  self.lng = result.position.lng; //设置经度
                  self.lat = result.position.lat; //设置维度
                  self.center = [self.lng, self.lat]; //设置坐标
                  self.loaded = true; //load
                  self.$nextTick(); //页面渲染好后
                  self.$emit("getLng", self.lng);
                  self.$emit("getLat", self.lat);
                  self.$emit(
                    "getAddress",
                    JSON.stringify(result.formattedAddress)
                  );
                }
              });
            }
          }
        }
      ]
    };
  },
  methods: {
    //把经纬度传到父组件
    // sendlnglat() {
    //   this.$emit("register", this.lng, this.lat);
    // }
  }
};
</script>

<style>
.amap-page-container {
  position: relative;
  width: 100%;
  margin-top: 0.03rem;
  /* height: 94%; */
  height: 100%;
  font-size: 0.12rem;
  color: #fff;
}

.amap-geolocation-con {
  left: 86% !important;
  /* right: 10px; */
  /* bottom: 34px !important; */
  bottom: 6px !important;
}

.toolbar {
  line-height: 30px;
  font-size: 15px;
  color: #fff;
  margin-top: 10px;
}
</style>
