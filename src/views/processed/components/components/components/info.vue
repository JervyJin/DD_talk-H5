<template>
  <div class="infoContainer container">
    <div class="common-div">
      <div class="pagelist">
        <div v-if="this.resData">
          <!-- <div class="content" v-for="(item, key) in resData" :key="key">
            <van-cell>
              <template slot="title">
                <div class="custom-title">案卷编号</div>
                <div class="custom-value">{{ item.reportId }}</div>
              </template>
            </van-cell>
          </div> -->
        </div>
        <div v-else>
          {{ "暂无数据" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      checked: true,
      rateValue: 0,
      infoData: [],
      resData: []
    };
  },
  watch: {
    $route(to, from) {
      this.id = to.query.id;
      console.log("id,", to.query.id);
    }
  },
  created() {
    this.getInfo();
    // 监听程度的大小并返回到组件上
  },
  mounted() {
    console.log("hhh", this.infoData);
  },
  methods: {
    getInfo() {
      const id = this.$route.query.id;
      this.$http
        .get("api/report/reportDetailed", {
          params: {
            id: id
          }
        })
        .then(res => {
          // debugger;
          if (res.data.errcode == 0) {
            // this.infoData = res.data.data.content;
            if (res.data.data.content != []) {
              this.infoData = res.data.data.content;
              console.log("resData", this.infoData);
            } else {
              Toast("信息为空");
            }
          } else {
            Toast.fail("获取信息失败" + res.data.errmsg);
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../../../assets/css/processed.css";
.infoContainer {
  .pagelist .content:not(:last-child) {
    margin: 0 auto 15px;
  }
}
</style>
