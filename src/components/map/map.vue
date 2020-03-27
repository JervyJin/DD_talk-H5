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
        <el-amap-marker :position="center" vid="amapMarker1">
        </el-amap-marker>

        <el-amap-marker :position="point1.startArr"
                        :events="point1.event"
                        v-if="point1.startArr && point1.startArr.length > 0"
                        vid="amapMarker2"
        >
          <template>
            <img src="http://121.40.243.200:8089/img/point1.gif"
                 style="width: 15px"
                 alt="">
          </template>
        </el-amap-marker>

        <el-amap-marker :position="point2.startArr"
                        :events="point2.event"
                        v-if="point2.startArr && point2.startArr.length > 0"
                        vid="amapMarker3">
          <template>
            <img src="http://121.40.243.200:8089/img/point2.gif"
                 style="width: 15px"
                 alt="">
          </template>
        </el-amap-marker>

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
      center: [120.1957, 30.39479],
      startArr: [],
      endArr: [],
      zoom: 17,
      lng: 0,
      point1: {},
      point2: {},
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
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 100, //超过10秒后停止定位，默认：无穷大
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          pName: "Geolocation", //定位
          showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          extensions: "all",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              console.log('这边初始化了');
              o.getCurrentPosition((status, result) => {
                if (result.info == "SUCCESS" && status == "complete") {
                  self.lng = result.position.lng; //设置经度
                  self.lat = result.position.lat; //设置维度
                  self.center = [self.lng, self.lat]; //设置坐标
                  self.loaded = true; //load
                  console.log("lng", self.lng, "lat", self.lat, "地址:", JSON.stringify(result.formattedAddress));
                }
              });``
            }
          }
        }
      ]
    };
  },
  methods: {
    sure(){
      this.$eventBus.$emit('getLngAndLat',  this.center);
      this.$router.push({name: 'copyList'});
    }
  },
  mounted() {
    if(this.$route.params.data){
      let item = this.$route.params.data;
      if(item.longitudeStart && item.latitudeStart){
        this.$set(this.point1, 'startArr', [item.longitudeStart, item.latitudeStart]);
        this.$set(this.point1, 'event', {
          click: () => {
            this.$emit('showDetail', item);
          }
        });
      }
      if(item.longitudeEnd && item.atitudeEnd){
        this.$set(this.point2, 'startArr', [item.longitudeEnd, item.atitudeEnd]);
        this.$set(this.point2, 'event', {
          click: () => {
            this.$emit('showDetail', item);
          }
        });
      }
      console.log(this.point1, this.point2);
      console.log(this.$route.params.data, '这边接受到的数据');
    }
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
