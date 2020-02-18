<template>
  <div class="homeContainer">
    <!-- 首页 -->
    <div class="map">
      <map-container></map-container>
    </div>
    <div class="list">
      <router-link to="/copyList">
        <i class="iconfont lq-ic_upload"></i>
        <div>抄送列表</div>
      </router-link>
    </div>
    <footer-container></footer-container>
  </div>
</template>

<script>
import mapContainer from "components/map/map";
import footerContainer from "components/footer/footer";

export default {
  components: { footerContainer, mapContainer }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/home.css";
.map {
  height: 93%;
}
.list {
  position: absolute;
  bottom: 10%;
  left: 5%;
  background: #fff;
  color: #000;
  text-align: center;
  z-index: 34;
  padding: 6px;
}
</style>
