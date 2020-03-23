<template>
  <div class="reviewContainer ">
    <div class="common-div">
      <div class="pagelist">
        <div class="content" v-for="(item, key) in infoData" :key="key">
          <van-cell>
            <template slot="title">
              <div class="custom-title">{{ item.facilitiesName }}</div>
              <div class="custom-value">{{ item.damageName }}</div>
            </template>
          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="custom-title">上报:</div>
              <div class="custom-value">{{ item.reportTime }}</div>
              <div class="custom-title">截止:</div>
              <div class="custom-value">{{ item.byTime }}</div>
            </template>
          </van-cell>
          <div
            v-if="
              item.problemDescribe == '' ||
                item.problemDescribe == null ||
                item.problemDescribe == undefined
            "
          >
            <van-cell>
              <template slot="title">
                <div class="custom-title">构件名称-编号</div>
                <div class="custom-value">{{ item.damageId }}</div>
              </template>
            </van-cell>
          </div>
          <div v-else>
            <van-cell>
              <template slot="title">
                <div class="custom-title">构件名称-编号</div>
                <div class="custom-value">{{ item.damageId }}</div>
              </template>
            </van-cell>
            <van-cell>
              <template slot="title">
                <div class="custom-title">问题描述</div>
                <div class="custom-value">{{ item.problemDescribe }}</div>
              </template>
            </van-cell>
          </div>
          <van-cell>
            <template slot="title">
              <van-button
                type="info"
                @click="handleBtn('不合格', item.reportId)"
                >不合格</van-button
              >
              <van-button type="info" @click="handleBtn('合格', item.reportId)"
                >合格</van-button
              >
            </template>
          </van-cell>
        </div>
      </div>
    </div>

    <div class="dialog">
      <van-dialog v-model="rateShow" show-cancel-button>
        <div class="content">
          <div class="title">不合格理由</div>
          <van-field
            v-model="message"
            rows="1"
            autosize
            label="留言"
            type="textarea"
            placeholder="请输入留言"
          />
        </div>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";
export default {
  data() {
    return { message: "", rateShow: "" };
  },
  props: ["infoData"],
  methods: {
    getProcessInfo() {
      this.$http
        .get("api/report/pendingReport", {
          params: {
            reportUserId: "314762512036601402",
            reportType: 3
          }
        })
        .then(res => {
          if (res.data.errcode === 0) {
            if (res.data.data.content.length == 0) {
              Toast("暂无数据，请去病害上报上传信息");
              this.infoData = [];
            } else {
              console.log("active", this.active);
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
    },
    handleBtn(text, id) {
      let reportType = "";
      text == "不合格"
        ? ((reportType = 6), (this.rateShow = true))
        : (reportType = 7);
      let params = {
        reportType: reportType,
        reportId: id
      };
      console.log("params", params);
      return false;
      Dialog.confirm({
        message: "是否确定要进行此操作"
      })
        .then(() => {
          this.$http.post("api/insertOrUpdateReport", params).then(res => {
            if (res.data.errcode == 0) {
              Toast("操作成功");
              this.getProcessInfo();
            } else {
              Toast.fail(res.data.errmsg);
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/processed.css";
</style>
