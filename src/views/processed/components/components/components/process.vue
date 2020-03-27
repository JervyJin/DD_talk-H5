<template>
  <div class="processContainer" style="margin-top: 11px;">
    <van-steps direction="vertical" :active="choosrActive">
      <van-step v-for="(item, i) in infoData" :key="i">
        <div class="flex jc-sb">
          <h6>{{ item.reportType }}</h6>
          <div>{{ item.reportTime }}</div>
        </div>
        <p>{{ item.processId }}</p>
        <p>
          问题备注：<span>{{ item.problemDescribe }}</span>
        </p>
      </van-step>
    </van-steps>
  </div>
</template>
<script>
import { formateDate } from "js/date";
export default {
  data() {
    //这里存放数据
    return {
      data: [],
      choosrActive: "1"
    };
  },
  props: ["infoData"],
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    if (this.infoData[0].reportType == 1) {
      this.infoData[0].reportType = "待处理";
    } else if (this.infoData[0].reportType == 2) {
      this.infoData[0].reportType == "已退回";
    } else if (this.infoData[0].reportType == 3) {
      this.infoData[0].reportType == "待审核";
    } else if (this.infoData[0].reportType == 4) {
      this.infoData[0].reportType == "通过";
    } else if (this.infoData[0].reportType == 5) {
      this.infoData[0].reportType == "驳回";
    } else if (this.infoData[0].reportType == 6) {
      this.infoData[0].reportType == "不合格";
    } else {
      this.infoData[0].reportType == "合格";
    }

    this.infoData[0].reportTime = formateDate(this.infoData[0].reportTime);
  }
  //方法集合
};
</script>
<style lang="less" scoped>
.processContainer {
  min-height: 100vh;
  background: #e5e5e7;
}
</style>
