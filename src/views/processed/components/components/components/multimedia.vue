<template>
  <div class="multimediaContainer container">
    <div class="common-div">
      <div class="pagelist">
        <div class="content contents">
          <div class="title">问题描述</div>
          <div class="img-content">
            <img :src="img" v-for="img in imageList" />
          </div>
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
      imgPath: "",
      imageList: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
        "https://img.yzcdn.cn/vant/apple-3.jpg",
        "https://img.yzcdn.cn/vant/apple-4.jpg",
        "https://img.yzcdn.cn/vant/apple-5.jpg",
        "https://img.yzcdn.cn/vant/apple-6.jpg"
      ]
    };
  },
  props: ["resData"]
};
</script>
<style lang="less" scoped>
@import "../../../../../assets/css/processed.css";
.multimediaContainer {
  .pagelist .content {
    width: 93%;
    background-color: #fff;
    border-radius: 5px;
    margin: 11px auto 0;
    .title {
      border-bottom: 1px solid #bbb;
      text-align: left;
      padding-bottom: 10px;
      margin-left: 11px;
      padding-top: 10px;
    }
    .img-content {
      display: flex;
      flex-wrap: wrap;
      img {
        width: 103px;
        height: 103px;
        margin: 15px 5px 15px 8px;
        background: red;
      }
    }
  }
}
</style>
