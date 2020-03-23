<template>
  <div class="layout">
    <NavBar
      v-show="navShow"
      :title="title"
      :isleftarrow="isleftarrow"
      :leftText="leftText"
    />
    <router-view />
  </div>
</template>
<script>
import NavBar from "components/header/header";
export default {
  components: {
    NavBar
  },
  data() {
    return {
      title: "",
      isleftarrow: false,
      leftText: "",
      navShow: true
    };
  },
  mounted() {
    dd.ready(() => {
      dd.biz.navigation.setLeft({
        text: "邮箱正文", //显示文字信息
        onSuccess: function(result) {
          /**/
        },
        onFail: function() {}
      });
    });
    dd.error(error => {
      alert("error");
      alert(`dd error: ${JSON.stringify(error)}`);
    });

    this.title = this.$route.meta.title;
    this.isleftarrow = this.$route.meta.isleftarrow;
    this.isleftarrow == true
      ? ((this.leftText = "返回"), (this.navShow = true))
      : ((this.leftText = ""), (this.navShow = false));
  },
  watch: {
    $route(to, from) {
      this.title = to.meta.title;
      this.isleftarrow = to.meta.isleftarrow;
      this.isleftarrow == true
        ? ((this.leftText = "返回"), (this.navShow = true))
        : ((this.leftText = ""), (this.navShow = false));
    }
  }
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
