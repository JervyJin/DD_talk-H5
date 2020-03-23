<template>
  <div class="homeContainer">
    <!-- 首页 -->
    <div class="map">
      <div class="search">
        <img
          src="@/assets/img/icon-search.png"
          alt="搜索"
          @click="handleSearch"
        />
      </div>
      <map-container></map-container>
    </div>
    <div class="list">
      <router-link to="/copyList">
        <img src="@/assets/img/icon-bhcs.png" alt="病害抄送" />
      </router-link>
    </div>
    <footer-container></footer-container>
  </div>
</template>

<script>
import mapContainer from "components/map/map";
import footerContainer from "components/footer/footer";
import { Toast } from "vant";
export default {
  components: { footerContainer, mapContainer },
  methods: {
    handleSearch() {
      this.$router.push("/search");
      // Toast("哈哈哈哈");
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/home.css";
.map {
  // height: 86vh;
  height: 93vh;
  .search {
    position: absolute;
    right: 23px;
    top: 39px;
    z-index: 11111;
  }
}
.list {
  position: absolute;
  bottom: 10%;
  left: 5%;
  z-index: 34;
}
</style>
