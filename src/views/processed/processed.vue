<template>
  <!-- TODO:父子组件传值未实现 -->
  <div class="container">
    <div class="tab">
      <van-tabs @click="onClick">
        <van-tab title="待处理" :info="pendingInfo">
          <pending :infoData="infoData" v-if="infoData.length > 0" />
        </van-tab>
        <!-- <van-tab title="已退回" :info="returnedInfo">
          <returned :infoData="infoData" v-if="infoData.length > 0" />
        </van-tab> -->
        <van-tab title="待审核" :info="reviewInfo">
          <review :infoData="infoData" v-if="infoData.length > 0" />
        </van-tab>
      </van-tabs>
    </div>
    <footer-container />
  </div>
</template>

<script>
import pending from "./components/pending";
// import returned from "./components/returned";
import review from "./components/review";
import footerContainer from "components/footer/footer";
import { Toast } from "vant";
import { formateDate } from "js/date";
export default {
  components: {
    pending,
    // returned,
    review,
    footerContainer
  },
  data() {
    return {
      active: 0,
      infoData: [],
      pendingInfo: 0,
      // returnedInfo: 0,
      reviewInfo: 0,
      reportUserId: "",
      reportId: ""
    };
  },
  mounted() {
    const _this = this;
    dd.util.domainStorage.getItem({
      name: "userid", // 存储信息的key值
      onSuccess: function(info) {
        _this.reportUserId = info.value;
        alert(info.value);
        if (info.value) {
          _this.getProcessInfo();
        }
      },
      onFail: function(err) {
        alert("获取useridtoken失败，请重新授权");
        alert(JSON.stringify(err));
      }
    });
  },
  methods: {
    onClick(name) {
      this.active = name;
      this.getProcessInfo();
    },
    getProcessInfo() {
      const self = this;
      this.active = this.active + 1;
      if (this.active == 2) {
        this.active = 3;
      }
      if (!this.reportUserId) {
        this.reportUserId = "013062525840476870";
      }
      this.$http
        .get(`${url}/report/pendingReport`, {
          params: {
            reportUserId: this.reportUserId,
            reportType: this.active
          }
        })
        .then(res => {
          if (res.data.errcode === 0) {
            if (res.data.data.content.length == 0) {
              Toast("暂无数据");
              this.infoData = [];
            } else {
              console.log(res);

              this.active == 1
                ? (self.pendingInfo = res.data.data.count)
                : (self.reviewInfo = res.data.data.count);

              this.infoData = res.data.data.content;
              res.data.data.content.map(value => {
                if (value.reportTime != null || value.byTime != null) {
                  value.reportTime = formateDate(value.reportTime);
                  value.byTime = formateDate(value.byTime);
                }
              });
            }
          } else {
            Toast("获取信息失败" + res.data.errmsg);
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/processed.css";
input {
  text-align: right;
}

input::-webkit-input-placeholder {
  color: #031222;
}

.tab {
  height: 100%;
  padding-bottom: 55px;
  // flex: 1;
  // margin-bottom: 20px;
}

.van-tabs__content{

}
</style>
