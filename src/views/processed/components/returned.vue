<template>
  <div class="returnContainer ">
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
                <div class="custom-title">退回理由</div>
                <div class="custom-value">{{ item.problemDescribe }}</div>
              </template>
            </van-cell>
          </div>
          <van-cell>
            <template slot="title">
              <van-button type="info" @click="handleBtn('驳回')"
                >驳回</van-button
              >
              <van-button type="info" @click="handleBtn('通过')"
                >通过</van-button
              >
            </template>
          </van-cell>
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
    handleBtn(text) {
      if (text == "驳回") {
        alert("点击到驳回了");
      } else {
        alert("点击到通过了");
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/processed.css";
</style>
