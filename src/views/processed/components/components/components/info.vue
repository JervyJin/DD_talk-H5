<template>
  <div class="infoContainer container">
    <div class="common-div">
      <div class="pagelist">
        <div v-if="this.infoData.length > 0">
          <div class="content" v-for="(item, key) in infoData" :key="key">
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
            <div>
              <van-cell class="imgContainer">
                <template slot="title" class="display-block">
                  <div class="custom-title">问题图</div>
                  <div class="custom-value flex warp">
                    <!-- <div v-if="!imgItem">
                        <img
                          class="zwtp"
                          src="@/assets/img/zwtp.png"
                          alt="暂无图片"
                        />
                      </div> -->
                    <div v-for="(imgItem, imgKey) in imgList" :key="imgKey">
                      <img :src="imgItem" />
                    </div>
                  </div>
                </template>
              </van-cell>
            </div>
            <!-- <div>
              <van-cell class="imgContainer">
                <template slot="title" class="display-block">
                  <div class="custom-title">处理后置图</div>
                  <div class="custom-value flex warp">
                    <div
                      v-for="(imgItems, imgKeys) in handleimgList"
                      :key="imgKeys"
                    >
                      <div v-if="!imgItems">
                        <img
                          class="zwtp"
                          src="@/assets/img/zwtp.png"
                          alt="暂无图片"
                        />
                      </div>
                      <div>
                        <img :src="imgItems" />
                      </div>
                    </div>
                  </div>
                </template>
              </van-cell>
            </div> -->
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
import { Toast } from "vant";

export default {
  data() {
    return {
      checked: true,
      rateValue: 0,
      imgList: [],
      handleimgList: []
    };
  },
  props: ["infoData"],
  mounted() {
    console.log("infoData", this.infoData);
    this.rateValue = this.infoData[0].damageDegree;
    // console.log("rateValue", this.rateValue);
    // TODO:后端返回数组处理数据
    // this.imgList.push(
    //   this.infoData[0].img1,
    //   this.infoData[0].img2,
    //   this.infoData[0].img3,
    //   this.infoData[0].img4,
    //   this.infoData[0].img5,
    //   this.infoData[0].img6
    // );
    // this.handleimgList.push(
    //   this.infoData[0].handleImg1,
    //   this.infoData[0].handleImg2,
    //   this.infoData[0].handleImg3,
    //   this.infoData[0].handleImg4,
    //   this.infoData[0].handleImg5,
    //   this.infoData[0].handleImg6
    // );
  },
  methods: {}
};
</script>
<style lang="less" scoped>
@import "../../../../../assets/css/processed.css";
.infoContainer {
  .pagelist .content:not(:last-child) {
    margin: 0 auto 15px;
  }

  .imgContainer {
    .van-cell__title {
      display: block;
      .custom-title {
        padding-bottom: 5px;
        margin-bottom: 5px;
        border-bottom: 1px solid #000;
      }
    }
  }

  img {
    width: 80px;
    height: 80px;
    margin-right: 25px;
  }
}
</style>
