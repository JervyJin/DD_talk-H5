<template>
  <div class="baseContainer">
    <div class="common-div">
      <div class="pagelist">
        <div
          class="content"
          v-for="(item, key) in infoData"
          :key="key"
          @click="routerDetails(item.reportId)"
        >
          <div v-if="infoData.length == 0">
            <img src="@/assets/img/zwsj.png" alt="暂无图片" />
            <div>无数据无数据</div>
          </div>
          <div else>
            <div>无数据无数据11</div>
            <van-cell>
              <template slot="title">
                <div class="custom-title">{{ item.facilitiesName }}</div>
                <div class="custom-value">{{ item.reportId }}</div>
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
            <div v-if="!item.problemDescribe">
              <van-cell>
                <template slot="title">
                  <div class="custom-title">构件名称-编号</div>
                  <div class="custom-value">{{ item.componentName }}</div>
                </template>
              </van-cell>
            </div>
            <div v-else>
              <van-cell>
                <template slot="title">
                  <div class="custom-title">构件名称-编号</div>
                  <div class="custom-value">{{ item.componentName }}</div>
                </template>
              </van-cell>
              <van-cell>
                <template slot="title">
                  <div class="custom-title">问题描述</div>
                  <div class="custom-value">{{ item.problemDescribe }}</div>
                </template>
              </van-cell>
            </div>
          </div>
        </div>
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
  methods: {
    routerDetails(id) {
      this.$router.push({ path: "/dossierDetails", query: { id: id } });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/processed.css";
</style>
