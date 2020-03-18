<template>
  <div class="copyContainer">
    <div class="common-div">
      <div class="pagelist">
        <div class="content">
          <van-cell>
            <template slot="title">
              <div class="custom-title">问题图</div>
              <div class="custom-value">
                <upload :count="6" @getImg="getImg"></upload>
              </div>
            </template>
          </van-cell>
          <van-cell class="display-block">
            <template slot="title">
              <div class="custom-title">位置</div>
              <div class="custom-value address">
                <mapContainer ref="map" @getMap="getMap" />
              </div>
            </template>
            <div>修改位置</div>
          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="custom-title">设施</div>
              <div class="custom-value">
                <facility @getType="getFacility"></facility>
              </div>
            </template>
          </van-cell>
          <!-- <van-cell>
            <template slot="title">
              <div class="custom-title">桩号</div>
              <div class="custom-value"></div>
            </template>
          </van-cell> -->
          <van-cell>
            <template slot="title">
              <div class="custom-title">设施方向</div>
              <div class="custom-value">
                <div class="flex">
                  <van-field
                    v-model="facilitiesDirection"
                    placeholder="南向北"
                    id="bearing"
                    readonly=""
                  />
                  <div>
                    <van-checkbox
                      id="check"
                      v-model="oppositeLane"
                      shape="square"
                    ></van-checkbox>
                  </div>
                  <van-field id="choose" v-model="position" readonly />
                </div>
              </div>
            </template>
          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="custom-title">部件类型</div>
              <div class="custom-value">
                <parts @getParts="getParts"></parts>
              </div>
            </template>
          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="custom-title">构件名称-编号</div>
              <div class="custom-value">
                <building @getType="getBuilding"></building>
              </div>
            </template>
          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="custom-title">损坏类型</div>
              <div class="custom-value">
                <damage @getType="getDamage"></damage>
              </div>
            </template>
          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="custom-title">
                程度
                <i class="iconfont lq-wenhao" @click="showRate"></i>
              </div>
              <div class="custom-value">
                <van-rate v-model="damageDegree" :count="4" touchable />
              </div>
            </template>
          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="custom-title">问题数量</div>
              <div class="custom-value flex">
                <van-field
                  readonly
                  clickable
                  :value="problemNum"
                  @touchstart.native.stop="problemNumShow = true"
                />
                <van-number-keyboard
                  v-model="problemNum"
                  :show="problemNumShow"
                  extra-key="."
                  close-button-text="完成"
                  @blur="close('问题数量')"
                />
                <div>{{ companyType }}</div>
              </div>
            </template>
          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="custom-title">处理时限</div>
              <div class="custom-value flex">
                <van-field
                  readonly
                  clickable
                  :value="limitTime"
                  @touchstart.native.stop="dateShow = true"
                />
                <van-number-keyboard
                  v-model="limitTime"
                  :show="dateShow"
                  close-button-text="完成"
                  @blur="close('处理时限')"
                />
                <div>天</div>
              </div>
            </template>
          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="custom-title">问题描述</div>
              <div class="custom-value problemDescribe">
                <!-- <i class="iconfont" @click="handleVoice">&#xe62e;</i> -->
                <van-field
                  v-model="problemDescribe"
                  rows="2"
                  autosize
                  type="textarea"
                  maxlength="300"
                  placeholder="请输入问题描述"
                  show-word-limit
                />
              </div>
            </template>
          </van-cell>
        </div>
      </div>
      <van-cell>
        <template slot="title">
          <van-button type="info" @click="submit">提交</van-button>
        </template>
      </van-cell>
    </div>

    <div class="dialog">
      <van-dialog v-model="rateShow" show-cancel-button>
        <div class="content">
          <div class="content-div">
            <div>
              <i
                class="iconfont lq-changyongtubiao-xianxingdaochu-zhuanqu-"
              ></i>
              <i
                class="iconfont lq-changyongtubiao-xianxingdaochu-zhuanqu-"
              ></i>
              <i
                class="iconfont lq-changyongtubiao-xianxingdaochu-zhuanqu-"
              ></i>
              <i
                class="iconfont lq-changyongtubiao-xianxingdaochu-zhuanqu-"
              ></i>
            </div>
            <div>完好无损</div>
          </div>
          <div class="content-div">
            <div>
              <i class="iconfont lq-star_full"></i>
              <i
                class="iconfont lq-changyongtubiao-xianxingdaochu-zhuanqu-"
              ></i>
              <i
                class="iconfont lq-changyongtubiao-xianxingdaochu-zhuanqu-"
              ></i>
              <i
                class="iconfont lq-changyongtubiao-xianxingdaochu-zhuanqu-"
              ></i>
            </div>
            <div>轻微</div>
          </div>
          <div class="content-div">
            <div>
              <i class="iconfont lq-star_full"></i>
              <i class="iconfont lq-star_full"></i>
              <i
                class="iconfont lq-changyongtubiao-xianxingdaochu-zhuanqu-"
              ></i>
              <i
                class="iconfont lq-changyongtubiao-xianxingdaochu-zhuanqu-"
              ></i>
            </div>
            <div>中度,不影响安全</div>
          </div>
          <div class="content-div">
            <div>
              <i class="iconfont lq-star_full"></i>
              <i class="iconfont lq-star_full"></i>
              <i class="iconfont lq-star_full"></i>
              <i
                class="iconfont lq-changyongtubiao-xianxingdaochu-zhuanqu-"
              ></i>
            </div>
            <div>严重,将影响安全</div>
          </div>
          <div class="content-div">
            <div>
              <i class="iconfont lq-star_full"></i>
              <i class="iconfont lq-star_full"></i>
              <i class="iconfont lq-star_full"></i>
              <i class="iconfont lq-star_full"></i>
            </div>
            <div>紧急,已影响到安全</div>
          </div>
        </div>
        <!-- <img src="https://img.yzcdn.cn/vant/apple-3.jpg" /> -->
      </van-dialog>
    </div>
  </div>
</template>

<script>
import upload from "components/upload/upload";
import mapContainer from "./components/map";
import facility from "./components/facility";
import parts from "./components/parts";
import building from "./components/building";
import damage from "./components/damageType";
import { getSignature } from "js/util.js";
import { Toast } from "vant";
export default {
  components: {
    upload,
    mapContainer,
    facility,
    parts,
    building,
    damage
  },
  data() {
    return {
      dateShow: false, //天数数字键盘
      problemNumShow: false, //问题数量数字键盘
      rateShow: false, //程度级别
      reportUserId: "013062525840476870", //上报人
      facilitiesName: "", // 设施
      facilitiesDirection: "", // 设施方向
      position: "对向车道", // 设施方向
      partsName: "", // 部件类型
      componentName: "", // 构件名称-编号
      damageId: "", // 损坏类型
      companyType: "x", // 损坏类型单位
      damageDegree: 2, // 程度
      problemNum: "", // 问题数量
      limitTime: "", // 处理时限
      problemDescribe: "", // 问题描述
      latitude: "", // 纬度
      longitude: "", // 经度
      address: "", // 地址
      imgList: [],
      maxDuration: 3, //录音时长
      oppositeLane: false,
      jsApiList: [
        "runtime.info",
        // 需要用的
        "device.geolocation.get",
        "device.audio.startRecord", // 开始录音
        "device.audio.stopRecord", // 停止录音
        "device.audio.onRecordEnd", // 监听停止录音
        // 'device.audio.download',  //录音下载
        // 'device.audio.play',  // 播放录音
        "device.audio.translateVoice" // 语音转文字
      ],
      corpId: "ding69b3c300f038527a35c2f4657eb6378f",
      appkey: "dingkvfxrebe5d5ghcgp",
      appsecret:
        "bbKHABz6QHKXqAhJaAzS8o12VYNgCJ4a9LBop6WArP7uSAg6k-Dsa3dugi5FiByu",
      code: ""
    };
  },
  mounted() {
    // TODO:免登操作
    const _this = this;
    dd.util.domainStorage.getItem({
      name: "userid", // 存储信息的key值
      onSuccess: function(info) {
        console.log("info", JSON.stringify(info.value));
        _this.reportUserId = info.value;
      },
      onFail: function(err) {
        alert("获取useridtoken失败");
        alert(JSON.stringify(err));
        // this.getCode();
      }
    });
  },
  methods: {
    getCode() {
      const _this = this;
      dd.ready(() => {
        dd.runtime.permission.requestAuthCode({
          corpId: this.corpId,
          onSuccess: function(result) {
            console.log("code:", JSON.stringify(result.code));
            _this.code = result.code;
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
    // 获取accessToken
    getToken() {
      this.$http
        .get("api/DDLogin/getAccessToken", {
          params: {
            appkey: this.appkey,
            appsecret: this.appsecret
          }
        })
        .then(res => {
          if (res.data.errcode == 0) {
            console.log("accessToken", res.data.data.content.accessToken);
            this.getUserId(res.data.data.content.accessToken);
          }
        });
    },
    // 获取userId
    getUserId(accessToken) {
      console.log("accessToken", accessToken);
      console.log("code", this.code);
      this.$http
        .get("api/DDLogin/getUserid", {
          params: {
            accessToken: accessToken,
            code: this.code
          }
        })
        .then(res => {
          if (res.data.data.content.errcode == 0) {
            alert("userid获取成功");
            dd.util.domainStorage.setItem({
              name: "userid", // 存储信息的key值
              value: res.data.data.content.userid, // 存储信息的Value值
              onSuccess: function(info) {
                alert("写入成功");
                // console.log("写入成功", JSON.stringify(info));
              },
              onFail: function(err) {
                alert("写入失败");
                console.log("写入失败", JSON.stringify(info));
              }
            });

            this.reportUserId = res.data.data.content.userid;
          } else {
            Toast.fail("userid错误:", res.data.data.errmsg);
            console.log("userid错误:", res.data.data.errmsg);
          }
        });
    },
    // 显示程度
    showRate() {
      this.rateShow = true;
    },
    // 关闭键盘
    close(text) {
      text == "问题数量"
        ? (this.problemNumShow = false)
        : (this.dateShow = false);
    },
    // TODO:数量不能为0
    // TODO:判断rate往左移动/点击为0
    // moveRate(event) {
    //   console.log("移动了");
    //   var touch = event.targetTouches[0];
    //   if (touch.pageX < 146) {
    //     console.log("startX", touch.pageX);
    //     this.damageDegree = 0;
    //   }
    // },
    //
    getFacility(data, componentDirection) {
      console.log("父组件设施为:" + data);
      this.facilitiesName = data;
      this.facilitiesDirection = componentDirection;
    },
    getParts(data) {
      console.log("部件类型父组件数据===" + data);
      this.partsName = data;
    },
    getBuilding(data) {
      console.log("构件编号父组件数据===" + data);
      this.componentName = data;
    },
    getDamage(data, companyType) {
      console.log("损坏父组件数据===" + data);
      this.damageId = data;
      this.companyType = companyType;
    },
    getMap(lng, lat, address) {
      this.longitude = lng;
      this.latitude = lat;
      this.address = address;
    },
    getImg(img) {
      this.imgList = img;
    },
    handleVoice() {
      alert("鉴权成功");
      alert("点击到了语音识别");
      // 监听语音自动停止
      dd.ready(() => {
        Toast("进来了");

        // dd.device.audio.onRecordEnd({
        //   onSuccess: function(res) {
        //     res.mediaId; // 停止播放音频MediaID
        //     res.duration; // 返回音频的时长，单位：秒
        //     Toast("录音停止");
        //   },
        //   onFail: function(err) {
        //     Toast("录音停止失败");
        //     // 监听开始录音
        //     dd.device.audio.startRecord({
        //       maxDuration: this.maxDuration,
        //       onSuccess: function() {
        //         Toast("开始录音");
        //       },
        //       onFail: function(err) {
        //         Toast("录音失败");
        //       }
        //     });
        //   }
        // });
      });
    },
    submit() {
      if (!this.latitude || !this.longitude || !this.address) {
        this.latitude = 120.195662;
        this.longitude = 30.39472;
        this.address = "杭州市路桥集团有限公司";
        // this.reportUserId = "013062525840476870";
      }

      // 是否为对向车道
      if (this.oppositeLane === false) {
        this.oppositeLane = 0;
      } else if (this.oppositeLane === true) {
        this.oppositeLane = 1;
      }
      // 传值参数
      let params = {
        reportUserId: this.reportUserId,
        facilitiesName: this.facilitiesName,
        facilitiesDirection: this.facilitiesDirection,
        damageDegree: this.damageDegree,
        problemNum: this.problemNum,
        limitTime: this.limitTime,
        oppositeLane: this.oppositeLane,
        company: this.companyType,
        problemDescribe: this.problemDescribe,

        partsId: this.partsName,
        componentId: this.componentName,
        damageId: this.damageId,
        latitude: this.latitude,
        longitude: this.longitude,
        place: this.address,
        img1: this.imgList[0],
        img2: this.imgList[1],
        img3: this.imgList[2],
        img4: this.imgList[3],
        img5: this.imgList[4],
        img6: this.imgList[5],
        reportType: 1
      };
      console.log("params", params);
      let reg = /^[0-9]+([.]{1}[0-9]{1})?$/;
      if (!params.img1) {
        Toast.fail("请至少上传一张图片");
      } else if (
        !this.facilitiesName ||
        !this.partsName ||
        !this.componentName ||
        !this.damageId ||
        !this.damageDegree ||
        !this.problemNum ||
        !this.limitTime
      ) {
        const message = "设施、部件类型、构件名称-编号、损坏类型、问题数量";
        Toast.fail("请查看" + message + "是否填写");
        console.log("params11", params);
      } else if (!reg.test(params.problemNum)) {
        Toast.fail("问题数量只能保留一位小数");
      } else {
        console.log("提交的params", params);
        this.$http.post("api/insertOrUpdateReport", params).then(res => {
          if (res.data.errcode == 0) {
            Toast.success(res.data.errmsg);
            this.$router.push({ path: "/" });
          } else {
            Toast.fail("新增失败:", res.data.errmsg);
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/home.css";
.copyContainer {
  min-height: 100vh;
  background-color: #ededed;
  overflow-y: scroll;
  font-size: 13px;
  .address {
    width: 237px;
    height: 153px;
    background: red;
  }

  .problemDescribe {
    flex: 1;
    margin-left: 48px;
    border: 1px solid #e5e5e5;
    text-align: left;
    position: relative;
    i {
      position: absolute;
      z-index: 1;
      right: 47px;
      bottom: -3px;
      font-size: 16px;
    }
  }
}
</style>
