<template>
  <div class='backContainer'>
    <div class="content type">
      <van-cell value="请选择反馈类型" />
      <van-cell>
        <template>
          <span class="custom-title">问题反馈</span>
          <van-radio-group v-model="radio">
            <van-radio name="1"></van-radio>
          </van-radio-group>
        </template>
      </van-cell>
      <van-cell>
        <template>
          <span class="custom-title">功能建议</span>
          <van-radio-group v-model="radio">
            <van-radio name="2"></van-radio>
          </van-radio-group>
        </template>
      </van-cell>
      <van-cell>
        <template>
          <span class="custom-title">咨询</span>
          <van-radio-group v-model="radio">
            <van-radio name="3"></van-radio>
          </van-radio-group>
        </template>
      </van-cell>
    </div>
    <div class="content">
      <van-field
        v-model="opinion"
        rows="2"
        autosize
        type="textarea"
        placeholder="请填写意见内容"
        maxlength="240"
        show-word-limit
      />
      <div>
        <div id="img">
          <div class="add">
            <img
              src="../../assets/img/add.png"
              alt="添加"
            />
          </div>
        </div>
        <div>添加图片最多3张</div>
      </div>
    </div>
    <van-button
      type="info"
      class="btn"
    >提交</van-button>
  </div>
</template>
<script>
export default {
  data() {
    //这里存放数据
    return {
      opinion: "",
      radio: ""
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
<style lang='less' scoped>
@import "../../assets/css/mine.css";
</style>