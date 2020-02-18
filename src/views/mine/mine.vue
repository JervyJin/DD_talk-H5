<!--  -->
<template>
  <div class="mine-container pr">
    <header>
      <div class="header">
        <div class="img">
          <img
            src="@/assets/img/tx.jpg"
            alt="头像"
          />
        </div>
        <div class="name">龚铱白</div>
      </div>
    </header>
    <div class="content announcement">
      <van-cell value="通知公告" />
      <van-cell value="关于“建筑固废高效利用关键技术及工程..." />
      <van-cell value="关于“建筑固废高效利用关键技术及工程..." />
      <van-cell value="关于“建筑固废高效利用关键技术及工程..." />
    </div>
    <div class="content-container">
      <div class="content help">
        <van-cell
          title="意见反馈"
          class='iconfont lq-yijianfankui'
          to="/feedBack"
        >
          <van-icon
            slot="right-icon"
            style="line-height: inherit;"
            class='iconfont lq-right'
          />
        </van-cell>
        <van-cell
          title="使用帮助"
          class='iconfont lq-shiyongbangzhu'
          to="/help"
        >
          <van-icon
            slot="right-icon"
            style="line-height: inherit;"
            class='iconfont lq-right'
          />
        </van-cell>
        <van-cell
          title="关于我们"
          class='iconfont lq-guanyuwomen'
          to="/aboutUs"
        >
          <van-icon
            slot="right-icon"
            style="line-height: inherit;"
            class='iconfont lq-right'
          />
        </van-cell>
      </div>
    </div>
    <footer-container></footer-container>
  </div>
</template>

<script>
import footerContainer from "components/footer/footer";
export default {
  components: {
    footerContainer
  },
  data() {
    //这里存放数据
    return {};
  }
};
</script>
<style lang='less' scoped>
// @import "@/assets/css/mine.less"; //这个分号一定要写，要不会报错
@import "../../assets/css/mine.css";

.van-cell__title {
  text-align: left;
}

// .mine-container {
//   width: 100%;
//   height: 100vh;
//   background-color: #e5e5e7;
//   header {
//     height: 3.6rem;
//     background-color: red;
//     padding: 82px 0 0 15px;
//     padding: 1.64rem 0 0 0.3rem;
//     .img {
//       width: 1.26rem;
//       width: 16.8%;
//       height: 1.32rem;
//       img {
//         width: 100%;
//         height: 100%;
//         border-radius: 50%;
//       }
//     }
//     .name {
//       line-height: 30px;
//       padding: 0 0 0 0.18rem;
//     }
//   }
//   .content {
//     width: 93%;
//     background-color: #fff;
//     margin: 10px auto;
//     border-radius: 5px;
//     .title {
//       color: rgba(16, 16, 16, 0.68);
//       padding-left: 13px;
//     }
//     .detail {
//       padding: 10px 32px 16px 41px;
//       line-height: 30px;
//     }
//   }

//   .announcement {
//     padding-top: 10px;
//   }

//   .help {
//     padding: 5px 32px 5px 25px;
//     a {
//       display: block;
//       line-height: 45px;
//       font-size: 16px;
//     }

//     a:not(:last-child) {
//       border-bottom: 1px solid #bbbbbb;
//     }

//     .help > a:last-child {
//       padding-bottom: 5px;
//     }

//     .iconfont {
//       font-size: 0.38rem !important;
//     }

//     .iconfont:first-child {
//       padding-right: 0.42rem;
//     }

//     .right {
//       float: right;
//       padding-right: 25px;
//     }
//   }
// }
</style>