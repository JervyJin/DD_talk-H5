<template>
  <div class="baseContainer">
    <div class="common-div">
      <div class="pagelist">
        <router-link
          class="content"
          v-for="(item, key) in infoData"
          :key="key"
          tag="div"
          to="/dossierDetails"
        >
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
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["infoData"],
  // created() {
  //   console.log("infoData", this.infoData);
  // }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/processed.css";
</style>
