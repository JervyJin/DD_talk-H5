<template>
  <div>
    <div class="pr">
      <textarea placeholder="请输入病害描述" v-model="problemDescribe" maxlength="300"></textarea>
      <i class="iconfont pa yuyin">&#xe62e;</i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style lang='less' scoped>
@import "../../assets/css/home.css";
/* @import url(); 引入css类 */
</style>