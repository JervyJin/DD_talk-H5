<template>
  <div class="detailsContainer">
    <div class="tab">
      <van-tabs v-model="active" title-active-color="#4090F7" color="#4090F7">
        <van-tab title="基本信息">
          <info :resData="this.resData" v-if="this.resData.length > 0"></info>
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
import { Toast } from "vant";
export default {
  components: {
    info,
    process
  },
  data() {
    return {
      active: 0,
      resData: []
    };
  },
  created() {
    this.getProcessInfo();
  },
  methods: {
    getProcessInfo() {
      const id = this.$route.query.id;
      this.$http
        .get("api/report/reportDetailed", {
          params: {
            id: id
          }
        })
        .then(res => {
          if (res.data.errcode == 0) {
            this.resData = res.data.data.content;
            console.log("resData", this.resData);

            // if (res.data.data.content != []) {
            //   this.resData = res.data.data.content;
            // console.log("resData", this.resData);
            // } else {
            //   Toast("信息为空");
            // }
          } else {
            Toast.fail("获取信息失败" + res.data.errmsg);
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
