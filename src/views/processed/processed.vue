<template>
  <!-- TODO:父子组件传值未实现 -->
  <div class="container">
    <div class="tab">
      <van-tabs @click="onClick">
        <van-tab title="待处理" :info="pendingInfo">
          <pending
            :infoData="infoData"
            :startTime="startTime"
            :endTime="endTime"
            v-if="infoData.length > 0"
          ></pending>
        </van-tab>
        <van-tab title="已退回" :info="returnedInfo">
          <returned
            :infoData="infoData"
            :startTime="startTime"
            :endTime="endTime"
            v-if="infoData.length > 0"
          ></returned>
        </van-tab>
        <van-tab title="待审核" :info="reviewInfo">
          <review
            :infoData="infoData"
            :startTime="startTime"
            :endTime="endTime"
            v-if="infoData.length > 0"
          ></review>
        </van-tab>
      </van-tabs>
    </div>
    <footer-container></footer-container>
  </div>
</template>

<script>
import pending from "./components/pending";
import returned from "./components/returned";
import review from "./components/review";
import footerContainer from "components/footer/footer";
import { Toast } from "vant";
import { formateDate } from "js/date";
export default {
  components: {
    pending,
    returned,
    review,
    footerContainer
  },
  data() {
    return {
      active: 0,
      infoData: [],
      pendingInfo: 4,
      returnedInfo: 4,
      reviewInfo: 4,
      startTime: "",
      endTime: ""
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
      this.active = this.active + 1;
      // console.log("resActive:", this.active);
      this.$http
        .get("/api/selectReport", {
          params: {
            reportId: "",
            reportType: this.active
          }
        })
        .then(function(res) {
          const msg = res.data.errmsg;
          const obj = res.data.data.content;
          if (res.data.errcode === 0) {
            if (obj.length == 0) {
              Toast.fail("信息为空,请添加一条数据");
            } else {
              self.infoData = obj;
              // console.log("obj:", self.infoData);
              self.pendingInfo = obj[0].reportCount;
              self.returnedInfo = obj[0].reportCount1;
              self.reviewInfo = obj[0].reportCount2;
              // TODO:第一条无数据也被展示成有数据
              obj.map(value => {
                if (value.reportTime === null && value.byTime === null) {
                  return false;
                } else {
                  value.reportTime = formateDate(value.reportTime);
                  value.byTime = formateDate(value.byTime);
                }
                // console.log("startTime:", value.reportTime);
                // console.log("endTime:", value.byTime);
              });
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

// /deep/ .weui-dialog {
//   padding: 15px;
//   .vux-x-textarea {
//     height: 200px;
//     border: 1px solid #888;
//     position: relative;
//     margin-top: 5px;

//     /deep/ textarea {
//       height: 175px;
//     }

//     /deep/ .weui-textarea-counter {
//       color: #b2b2b2;
//       text-align: right;
//       position: absolute;
//       bottom: 5px;
//       right: 5px;
//     }
//   }

//   i {
//     font-size: 25px;
//     position: absolute;
//     right: 72px;
//     bottom: 49px;
//   }
//   .sure {
//     width: 78px;
//     line-height: 24px;
//     border: 1px solid #4090f7;
//     color: #4090f7;
//     text-align: center;
//     border-radius: 4px;
//     margin: 10px auto 0;
//   }
// }
</style>
