<template>
  <div class="processContainer">
    <van-steps direction="vertical" :active="choosrActive">
      <van-step v-for="(item, i) in data" :key="i">
        <div class="flex jc-sb">
          <h6>{{ item.createName }}</h6>
          <div>{{ item.createTime }}</div>
        </div>
        <p>{{ item.processId }}</p>
        <p>
          问题备注：<span>{{ item.reportId }}</span>
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
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getProcess();
  },
  //方法集合
  methods: {
    getProcess() {
      // TODO:要根据上一个页面点击的Id传值
      const id = 1;
      this.$http
        .get("/api/selectProcess", {
          params: {
            reportId: "",
            reportId: id
          }
        })
        .then(res => {
          if (res.status == 200 && res.data.errcode == 0) {
            console.log(res.data.data.content);
            const _this = this;
            res.data.data.content.forEach(value => {
              value.createTime = formateDate(value.createTime);
            });
            // createTime
            _this.data = res.data.data.content;
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.processContainer {
  min-height: 100vh;
  background: #e5e5e7;
}
</style>
