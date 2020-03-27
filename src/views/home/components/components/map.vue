<template>
  <div class="amap-page-container">
    <!--
    	zoom：放缩程度 ,
    	plugin：data中有定义，是一些插件，如工具栏等等，
    	center：定位经纬度位置
    	el-amap：高德地图组件
    -->
    <el-amap
      vid="amap"
      :zoom="zoom"
      ref="amap"
      :plugin="plugin"
      class="amap-demo"
      :center="center"
    >
      <el-amap-marker :position="center" vid="amapMarker"></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
export default {
  props: ['text', 'position', 'init'],
  data() {
    let self = this;
    return {
      zoom: 17,
      lng: 0,
      center: [120.1957, 30.39479],
      lat: 0,
      loaded: false,
      plugin: [
        //一些工具插件
        {
          pName: "Geolocation", //定位
          events: {
            init(o) {
              o.getCurrentPosition((status, result) => {
                console.log(111);
                if (result.info == "SUCCESS" && status == "complete") {
                  self.lng = result.position.lng; //设置经度
                  self.lat = result.position.lat; //设置维度
                  self.center = [self.lng, self.lat]; //设置坐标
                  self.loaded = true; //load
                  console.log('出发了', [self.lng, self.lat]);
                  self.$emit(
                          "getMap",
                          result.position.lng,
                          result.position.lat,
                          JSON.stringify(result.formattedAddress)
                  );
                  self.$nextTick(); //页面渲染好后
                }
              });
            }
          }
        }
      ]
    };
  },
  created(){
   this.$eventBus.$on('getLngAndLat', (data)=> {
     this.$set(this.center, 0, data[0]);
     this.$set(this.center, 1, data[1]);
      console.log('获取的定位', this.center);
    });


  },
  mounted() {
   /* this.$eventBus.$on('showPointMap', (data)=> {
      console.log(data, 222);
    })*/
    this.$emit(
                "getMap",
                this.center[0],
                this.center[1],
                ''
        );
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

</style>
