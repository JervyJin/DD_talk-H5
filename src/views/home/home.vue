<template>
  <div class="homeContainer">
    <!-- 首页 -->
    <div class="map">
      <div class="search">
        <i class="iconfont lq-i-search"></i>
        <div>搜索</div>
      </div>
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

  // i {
  //   color: #fff;
  //   font-size: 30px;
  // }
  .search {
    background: red;
    position: absolute;
    right: 23px;
    top: 39px;
    z-index: 11111;
    border-radius: 68%;
    padding: 15px;
    color: #fff;
    font-size: 15px;
  }
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
