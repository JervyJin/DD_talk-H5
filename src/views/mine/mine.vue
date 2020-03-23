<!--  -->
<template>
  <div class="mine-container pr">
    <header>
      <div class="header">
        <div class="img">
          <img :src="this.avatar" alt="" v-if="this.avatar" />
          <img src="@/assets/img/tx.jpg" alt="" v-else />
        </div>
        <div class="name">{{ name }}</div>
      </div>
    </header>
    <!-- <div class="content announcement">
      <van-cell value="通知公告" />
      <van-cell value="关于“建筑固废高效利用关键技术及工程..." />
      <van-cell value="关于“建筑固废高效利用关键技术及工程..." />
      <van-cell value="关于“建筑固废高效利用关键技术及工程..." />
    </div> -->
    <div class="content-container">
      <div class="content help">
        <van-cell
          title="意见反馈"
          class="iconfont lq-yijianfankui"
          to="/feedBack"
        >
          <van-icon
            slot="right-icon"
            style="line-height: inherit;"
            class="iconfont lq-right"
          />
        </van-cell>
        <!-- <van-cell
          title="使用帮助"
          class='iconfont lq-shiyongbangzhu'
          to="/help"
        >
          <van-icon
            slot="right-icon"
            style="line-height: inherit;"
            class='iconfont lq-right'
          />
        </van-cell> -->
        <van-cell
          title="关于我们"
          class="iconfont lq-guanyuwomen"
          to="/aboutUs"
        >
          <van-icon
            slot="right-icon"
            style="line-height: inherit;"
            class="iconfont lq-right"
          />
        </van-cell>
      </div>
    </div>
    <footer-container></footer-container>
  </div>
</template>

<script>
import { Toast } from "vant";
import { setInfo, deleteInfo } from "js/dd";
import footerContainer from "components/footer/footer";
export default {
  components: {
    footerContainer
  },
  data() {
    //这里存放数据
    return {
      name: "龚铱白",
      code: "",
      userid: "",
      token: "",
      avatar: ""
    };
  },
  created() {
    // deleteInfo("userid");
    // deleteInfo("code");
    // deleteInfo("token");
    this.getCode();
    const _this = this;
    if (!this.code || !this.token || !this.userid) {
      // alert("准备获取缓存");
      dd.util.domainStorage.getItem({
        name: "token", // 存储信息的key值
        onSuccess: function(info) {
          // console.log("accessToken获取的值:", JSON.stringify(info.value));
          _this.token = info.value;
        },
        onFail: function(err) {
          Toast.fail("accessToken获取失败:" + JSON.stringify(err));
          console.log("accessToken获取失败:" + JSON.stringify(err));
        }
      });
      dd.util.domainStorage.getItem({
        name: "code", // 存储信息的key值
        onSuccess: function(info) {
          // console.log("code获取的值:", JSON.stringify(info.value));
          _this.code = info.value;
        },
        onFail: function(err) {
          Toast.fail("coden获取失败:" + JSON.stringify(err));
          console.log("code获取失败:" + JSON.stringify(err));
        }
      });
      dd.util.domainStorage.getItem({
        name: "userid", // 存储信息的key值
        onSuccess: function(info) {
          // console.log("userid获取的值:", JSON.stringify(info.value));
          _this.userid = info.value;
        },
        onFail: function(err) {
          Toast.fail("userid获取失败:" + JSON.stringify(err));
          console.log("userid获取失败:" + JSON.stringify(err));
        }
      });
    }
    // this.getName();
  },
  methods: {
    getCode() {
      const _this = this;
      dd.ready(() => {
        dd.runtime.permission.requestAuthCode({
          corpId: "ding69b3c300f038527a35c2f4657eb6378f",
          onSuccess: function(result) {
            setInfo("code", result.code);
            _this.getToken();
          },
          onFail: function(err) {
            alert("fail");
            alert(JSON.stringify(err));
          }
        });
      });
      dd.error(error => {
        alert("error");
        alert(`dd error: ${JSON.stringify(error)}`);
      });
    },
    getToken() {
      this.$http
        .get("api/DDLogin/getAccessToken", {
          params: {
            appkey: "dingkvfxrebe5d5ghcgp",
            appsecret:
              "bbKHABz6QHKXqAhJaAzS8o12VYNgCJ4a9LBop6WArP7uSAg6k-Dsa3dugi5FiByu"
          }
        })
        .then(res => {
          if (res.data.data.content.errcode == 0) {
            setInfo("token", res.data.data.content.accessToken);
            this.getUserId();
          } else {
            alert(res.data.data.content.msg);
          }
        })
        .catch(err => {});
    },
    getUserId() {
      this.$http
        .get("api/DDLogin/getUserid", {
          params: {
            accessToken: this.token,
            code: this.code
          }
        })
        .then(res => {
          if (res.data.data.content.errcode == 0) {
            setInfo("userid", res.data.data.content.userid);
            this.getName();
          } else {
            Toast("userid错误:", res.data.data.content.msg);
            console.log("userid错误:", res.data.data.msg);
          }
        });
    },
    getName() {
      console.log("token:", this.token);
      console.log("userid:", this.userid);
      if (!this.token || !this.userid) {
        this.token = "d896b54349bd3c599b0d314984365519";
        this.userid = "013062525840476870";
      }
      this.$http
        .get("api/DDLogin/getUserINfo", {
          params: {
            accessToken: this.token,
            userid: this.userid
          }
        })
        .then(res => {
          // console.log("res", res);
          if (res.data.data.content.errorCode != 0) {
            Toast.fail("获取用户名失败:" + res.data.data.content.msg);
          } else {
            this.avatar = res.data.data.content.avatar;
            this.name = res.data.data.content.name;
            setInfo("userName", res.data.data.content.name);
            setInfo("mobile", res.data.data.content.mobile);
            setInfo("avatar", res.data.data.content.avatar);
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/mine.css";

.van-cell__title {
  text-align: left;
}
</style>
