<template>
  <div class="backContainer">
    <div class="content type">
      <van-cell value="请选择反馈类型" />
      <van-cell>
        <template>
          <span class="custom-title">问题反馈</span>
          <van-radio-group v-model="feedbackType">
            <van-radio name="1"></van-radio>
          </van-radio-group>
        </template>
      </van-cell>
      <van-cell>
        <template>
          <span class="custom-title">功能建议</span>
          <van-radio-group v-model="feedbackType">
            <van-radio name="2"></van-radio>
          </van-radio-group>
        </template>
      </van-cell>
      <van-cell>
        <template>
          <span class="custom-title">咨询</span>
          <van-radio-group v-model="feedbackType">
            <van-radio name="3"></van-radio>
          </van-radio-group>
        </template>
      </van-cell>
    </div>
    <div class="content">
      <van-field
        v-model="opinion"
        rows="2"
        autosize
        type="textarea"
        placeholder="请填写意见内容"
        maxlength="240"
        show-word-limit
      />
      <div>
        <upload :count="3" @getImg="getImg"></upload>
      </div>
    </div>
    <van-button type="info" class="btn" @click="submit">提交</van-button>
  </div>
</template>
<script>
import upload from "components/upload/upload";
import { Toast } from "vant";
import { deleteInfo, getInfo, setInfo } from "js/dd";
export default {
  components: {
    upload
  },
  data() {
    //这里存放数据
    return {
      opinion: "",
      feedbackType: "",
      imgList: [],
      userId: "",
      userName: "",
      phoneNumber: ""
    };
  },
  mounted() {
    if (!this.userId || !this.userName || !this.phoneNumber) {
      const _this = this;
      dd.util.domainStorage.getItem({
        name: "userid", // 存储信息的key值
        onSuccess: function(info) {
          // console.log("info", JSON.stringify(info.value));
          _this.userId = info.value;
        },
        onFail: function(err) {
          alert("获取useridtoken失败，请重新授权");
          alert(JSON.stringify(err));
        }
      });
      dd.util.domainStorage.getItem({
        name: "mobile", // 存储信息的key值
        onSuccess: function(info) {
          // console.log("info", JSON.stringify(info.value));
          _this.phoneNumber = info.value;
        },
        onFail: function(err) {
          alert("获取useridtoken失败，请重新授权");
          alert(JSON.stringify(err));
        }
      });
      dd.util.domainStorage.getItem({
        name: "userName", // 存储信息的key值
        onSuccess: function(info) {
          // console.log("info", JSON.stringify(info.value));
          _this.userName = info.value;
        },
        onFail: function(err) {
          alert("获取useridtoken失败，请重新授权");
          alert(JSON.stringify(err));
        }
      });
    }

    // console.log("userid:", this.userId);
    // console.log("phoneNumber:", this.phoneNumber);
    // console.log("userName:", this.userName);
  },
  //方法集合
  methods: {
    getImg(img) {
      this.imgList = img;
      console.log(this.imgList);
    },
    submit() {
      this.userId = "013062525840476870";
      this.userName = "龚铱白";
      this.phoneNumber = "13666683140";
      let params = {
        feedbackType: this.feedbackType,
        opinion: this.opinion,
        img1: this.imgList[0] ? this.imgList[0].url : '',
        img2: this.imgList[1] ? this.imgList[1].url : '',
        img3: this.imgList[2] ? this.imgList[2].url : '',
        userId: this.userId,
        userName: this.userName,
        phoneNumber: this.phoneNumber
      };
      console.log("params", params);
      // return false;
      if (!this.userId) {
        Toast("请检查用户Id是否获取到");
      } else if (!this.feedbackType || !this.opinion) {
        const message = "意见反馈、反馈类型";
        Toast("请检查" + message + "是否填写完整");
      } else if (this.imgList.length == 0) {
        Toast("至少上传一张图片");
      } else {
        this.$http
          .post(`${url}/feedback/insertOrUpdateFeedback`, params)
          .then(res => {
            if (res.data.errcode == 0) {
              Toast('反馈成功');
              this.$router.push({name: 'mine'})
            } else {
              Toast.fail("失败", res.data.errmsg);
            }
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/mine.css";
</style>
