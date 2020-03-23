<template>
  <div class="footer">
    <van-tabbar active-color="#4090F7" inactive-color="#000" route>
      <van-tabbar-item replace to="/" class="iconfont lq-shouye">
        首页
      </van-tabbar-item>
      <van-tabbar-item replace to="/processed" class="iconfont lq-chaosong">
        抄告列
      </van-tabbar-item>
      <van-tabbar-item replace to="/mine" class="iconfont lq-wode">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    //这里存放数据
    return {
      active: 0
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang="less" scoped>
.van-tabbar-item {
  font-size: 16px;
}

.van-tabbar {
  height: 7%;
  // background: red;
}
</style>
