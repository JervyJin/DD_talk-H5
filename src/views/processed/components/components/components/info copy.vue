<template>
  <div class="infoContainer container">
    <div class="common-div">
      <div class="pagelist">
        <div v-if="resData">
          <div class="content" v-for="(item, key) in resData" :key="key">
            <van-cell>
              <template slot="title">
                <div class="custom-title">案卷编号</div>
                <div class="custom-value">{{ item.reportId }}</div>
              </template>
            </van-cell>
            <van-cell>
              <template slot="title">
                <div class="custom-title">设施</div>
                <div class="custom-value">{{ item.facilitiesName }}</div>
              </template>
            </van-cell>
            <van-cell>
              <template slot="title">
                <div class="custom-title">设施方向</div>
                <div class="custom-value">{{ item.facilitiesDirection }}</div>
              </template>
            </van-cell>
            <van-cell>
              <template slot="title">
                <div class="custom-title">部件类型</div>
                <div class="custom-value">{{ item.partsName }}</div>
              </template>
            </van-cell>
            <van-cell>
              <template slot="title">
                <div class="custom-title">构件名称-编号</div>
                <div class="custom-value">{{ item.componentName }}</div>
              </template>
            </van-cell>
            <van-cell>
              <template slot="title">
                <div class="custom-title">损坏类型</div>
                <div class="custom-value">{{ item.damageName }}</div>
              </template>
            </van-cell>
            <van-cell>
              <template slot="title">
                <div class="custom-title">程度</div>
                <div class="custom-value">
                  <van-rate v-model="rateValue" readonly />
                </div>
              </template>
            </van-cell>
            <van-cell>
              <template slot="title">
                <div class="custom-title">问题数量</div>
                <div class="custom-value">{{ item.problemNum }}</div>
              </template>
            </van-cell>
            <van-cell>
              <template slot="title">
                <div class="custom-title">位置</div>
                <div class="custom-value">{{ item.place }}</div>
              </template>
            </van-cell>
            <div>
              <van-cell>
                <template slot="title">
                  <div class="custom-title">问题描述</div>
                  <div class="custom-value">{{ item.problemDescribe }}</div>
                </template>
              </van-cell>
            </div>
          </div>
        </div>
        <div v-else>
          {{ "暂无数据" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
      rateValue: 0,
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
    // 监听程度的大小并返回到组件上
    // TODO:无数据也被复制了
    // this.resData.forEach((value, index) => {
    //   if (value.damageDegree == 0 || value.damageDegree == null) {
    //     // this.rateValue = 0;
    //     return false;
    //   } else if (value.damageDegree == 1) {
    //     this.rateValue = 1;
    //   } else if (value.damageDegree == 2) {
    //     this.rateValue = 2;
    //   } else if (value.damageDegree == 3) {
    //     this.rateValue = 3;
    //   } else if (value.damageDegree == 4) {
    //     this.rateValue = 4;
    //   }
    // });
  },
  mounted() {
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
            if (res.data.data.content != []) {
              this.resData = res.data.data.content;
              console.log("resData", this.resData);
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
