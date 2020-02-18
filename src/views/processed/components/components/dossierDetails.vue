<template>
  <div class="detailsContainer">
    <div class="tab">
      <van-tabs
        v-model="active"
        @click="onClick"
        title-active-color="#4090F7"
        color="#4090F7"
      >
        <van-tab title="基本信息">
          <info :resData="infoData" v-if="infoData.length > 0"></info>
        </van-tab>
        <van-tab title="多媒体">
          <multimedia
            :resData="infoData"
            v-if="infoData.length > 0"
          ></multimedia>
        </van-tab>
        <van-tab title="抄送流程">
          <process></process>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import info from "./components/info";
import process from "./components/process";
import multimedia from "./components/multimedia";
import { Toast } from "vant";
export default {
  components: {
    info,
    process,
    multimedia
  },
  data() {
    return {
      active: 2,
      infoData: []
    };
  },
  created() {
    this.getProcessInfo();
  },
  methods: {
    onClick(name) {
      this.active = name;
      this.getProcessInfo();
    },
    getProcessInfo() {
      const self = this;
      const active = this.active + 1;
      this.$http
        .get("/api/selectReport", {
          params: {
            reportId: "",
            reportType: active
          }
        })
        .then(function(res) {
          const msg = res.data.errmsg;
          const obj = res.data.data.content;
          if (
            res.status == 200 &&
            res.data.errcode == 0 &&
            res.data.errmsg == "查询成功"
          ) {
            Toast.success("查询成功");
            if (obj != []) {
              self.infoData = obj;
            } else {
              Toast.fail("信息为空,请添加一条数据");
            }
          } else {
            self.$warning("获取信息失败" + res.data.errmsg);
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
// @import "../../../../assets/css/processed.css";
// input {
//   text-align: right;
// }

// input::-webkit-input-placeholder {
//   color: #031222;
// }
</style>
