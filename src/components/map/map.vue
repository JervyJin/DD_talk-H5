<template>
  <div>
    <div class="amap-page-container" style="width: 100vw; height: 100vh">
      <el-amap
              :vid="myId"
              :zoom="zoom"
              :plugin="plugin"
              class="amap-demo"
              :events="events"
              :center="center"
      >
        <el-amap-marker :position="center" vid="amapMarker"></el-amap-marker>
      </el-amap>
    </div>

    <van-button type="primary"
                style="position: fixed; top: 90vh; right: 3vw;"
                v-if="isUpdate"
                @click="sure">确定</van-button>
  </div>
</template>

<script>
export default {
  props: ['myId', 'isUpdate'],
  data() {
    let self = this;
    return {
      center: [121.59996, 31.197646],
      zoom: 17,
      lng: 0,
      lat: 0,
      loaded: false,
      events: {
        click: e => {
          if(this.isUpdate){
            this.center = [e.lnglat.lng, e.lnglat.lat];
          }
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
                if (result.info == "SUCCESS" && status == "complete") {
                  self.lng = result.position.lng; //设置经度
                  self.lat = result.position.lat; //设置维度
                  self.center = [self.lng, self.lat]; //设置坐标
                  self.loaded = true; //load
                  console.log("lng", self.lng, "lat", self.lat, "地址:", JSON.stringify(result.formattedAddress));
                  /*this.$emit(
                    "getMap",
                    result.position.lng,
                    result.position.lat,
                    JSON.stringify(result.formattedAddress)
                  );*/
                }
              });
            }
          }
        }
      ]
    };
  },
  methods: {
    sure(){
      this.$eventBus.$emit('getLngAndLat',  this.center);
      window.init = false;
      this.$router.push({name: 'copyList'});
    }
  },
  mounted() {
    // text = false;
  }
  // destroyed() {
  //   if (!!this.amap) {
  //     this.amap.destroy();
  //   }
  // }
};
</script>

<style scoped>

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
