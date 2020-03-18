<template>
  <!-- TODO:父子组件传值未实现 -->
  <div class="container">
    <div class="tab">
      <van-tabs @click="onClick">
        <van-tab title="待处理">
          <!-- <info :resData="infoData" v-if="infoData.length > 0" /> -->
          <info />
        </van-tab>
        <van-tab title="待审核">
          <process :infoData="infoData" v-if="infoData.length > 0" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import info from "./components/info";
import process from "./components/process";
import { formateDate } from "js/date";
export default {
  components: {
    info,
    process
  },
  data() {
    return {
      active: 0,
      infoData: []
    };
  },
  methods: {
    onClick(name) {
      this.active = name;
      // this.getProcessInfo();
    }
  }
};
</script>
