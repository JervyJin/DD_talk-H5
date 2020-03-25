<template>
  <!-- TODO:父子组件传值未实现 -->
  <div class="container">
    <div class="tab">
      <van-tabs>
        <van-tab title="基本信息">
          <info :infoData="infoData" v-if="infoData.length > 0" />
        </van-tab>
        <van-tab title="抄送流程">
          <process :infoData="infoData" v-if="infoData.length > 0" />
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
  watch: {
    $route(to, from) {
      this.id = to.query.id;
    }
  },
  data() {
    return {
      active: 0,
      infoData: []
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      if (!this.$route.query.id) {
        this.$route.query.id = "013062525840476870";
      }
      this.$http
        .get(`${url}/report/reportDetailed`, {
          params: {
            id: this.$route.query.id
          }
        })
        .then(res => {
          if (res.data.errcode === 0) {
            res.data.data.content != []
              ? this.infoData.push(res.data.data.content)
              : Toast("无数据");
          } else {
            Toast("无数据");
          }
        });
    }
  }
};
</script>
