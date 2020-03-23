<template>
  <div class="">
    <van-nav-bar
      :title="title"
      :left-arrow="isleftarrow"
      :left-text="leftText"
      @click-left="onClickLeft"
    />
  </div>
</template>
<script>
export default {
  props: ["title", "isleftarrow", "leftText"],
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
