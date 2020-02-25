<template>
  <div class="copyContainer">
    <div class="common-div">
      <div class="pagelist">
        <div class="content">
          <van-cell>
            <template slot="title">
              <div class="custom-title">问题图</div>
              <div class="custom-value">
                <upload></upload>
              </div>
            </template>
          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="custom-title">位置</div>
              <div class="custom-value address">
                <map-container
                  @getLng="getMap"
                  @getLat="getMap"
                  @getAddress="getMap"
                ></map-container>
              </div>
            </template>
          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="custom-title">设施</div>
              <div class="custom-value">
                <facility @getType="getFacility"></facility>
              </div>
            </template>
          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="custom-title">桩号</div>
              <div class="custom-value"></div>
            </template>
          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="custom-title">设施方向</div>
              <div class="custom-value">
                <div class="flex">
                  <van-field
                    v-model="facilitiesDirection"
                    placeholder="南向北"
                    id="bearing"
                  />
                  <div>
                    <van-checkbox
                      id="check"
                      v-model="checked"
                      shape="square"
                      @change="changeCheckBox"
                    ></van-checkbox>
                  </div>
                  <van-field
                    id="choose"
                    v-model="address"
                    readonly
                    placeholder="南向北"
                  />
                </div>
              </div>
            </template>
          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="custom-title">部件类型</div>
              <div class="custom-value">
                <parts @getType="getParts"></parts>
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
              <div class="custom-title">程度</div>
              <div class="custom-value">
                <!-- <van-rate
                  v-model="damageDegree"
                  :count="4"
                  touchable
                  @click.native="clickRate"
                  @touchstart.native="moveRate"
                  @touchmove.native="move"
                  @touchend.native="end"
                /> -->
                <van-rate
                  v-model="damageDegree"
                  :count="4"
                  touchable
                  @touchmove.native="moveRate"
                />
              </div>
            </template>
          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="custom-title">问题数量</div>
              <div class="custom-value flex">
                <van-field
                  class="padding-0 border-none"
                  v-model="problemNum"
                  placeholder="请输入问题数量"
                />
                <div class="date">个</div>
              </div>
            </template>
          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="custom-title">处理时限</div>
              <div class="custom-value flex">
                <van-field
                  class="padding-0 border-none"
                  v-model="date"
                  placeholder="请输入天数"
                />
                <div class="date">天</div>
              </div>
            </template>
          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="custom-title">问题描述</div>
              <div class="custom-value problemDescribe">
                <i class="iconfont" @click="handleVoice">&#xe62e;</i>
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
  </div>
</template>

<script>
import upload from "components/upload/upload";
import mapContainer from "components/map/map";
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
      facilitiesName: "", // 设施
      facilitiesDirection: "", // 设施方向
      address: "对向车道", // 设施方向
      partsName: "", // 部件类型
      componentName: "", // 构件名称-编号
      damageId: "", // 损坏类型
      damageDegree: 2, // 程度
      problemNum: "", // 问题数量
      date: "", // 处理时限？
      problemDescribe: "", // 问题描述
      latitude: "", // 纬度
      longitude: "", // 经度
      show: false,
      maxDuration: 3,
      checked: false,
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
      ]
    };
  },
  methods: {
    changeCheckBox() {
      const checked = document.getElementById("check");
      const bearing = document.getElementById("bearing").value;
      if (checked.checked) {
        let str = bearing;
        str = str
          .split("向")
          .reverse()
          .join("向");
        this.facilitiesDirection = str;
      } else {
        let str = bearing;
        str = str
          .split("向")
          .reverse()
          .join("向");
        this.facilitiesDirection = str;
      }
    },
    // TODO:数量不能为0
    // TODO:判断rate往左移动/点击为0
    moveRate(event) {
      console.log("移动了");
      var touch = event.targetTouches[0];
      if (touch.pageX < 146) {
        console.log("startX", touch.pageX);
        this.damageDegree = 0;
      }
    },
    getFacility(data) {
      console.log("父组件设施为:" + data);
      this.facilitiesName = data;
    },
    getParts(data) {
      console.log("Parts父组件数据===" + data);
      this.partsName = data;
    },
    getBuilding(data) {
      console.log("Building父组件数据===" + data);
      this.componentName = data;
    },
    getDamage(data) {
      console.log("Damage父组件数据===" + data);
      this.damageId = data;
    },
    getMap(lng, lat, address) {
      console.log("lng===" + lng);
      console.log("lat===" + lat);
      console.log("address===" + address);
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
      // alert("点击到了");
      console.log("facilitiesName:", this.facilitiesName);
      let params = {
        facilitiesName: this.facilitiesName,
        facilitiesDirection: this.facilitiesDirection,
        partsName: this.partsName,
        componentName: this.componentName,
        damageId: this.damageId,
        damageDegree: this.damageDegree,
        problemNum: this.problemNum,
        problemDescribe: this.problemDescribe,
        latitude: this.$route.query.latitude,
        longitude: this.$route.query.longitude
      };
      if (
        params.facilitiesName == "" ||
        params.partsName == "" ||
        params.componentName == "" ||
        params.damageId == "" ||
        params.damageDegree == "" ||
        params.problemNum == ""
      ) {
        let message = "设施、部件类型、构件名称-编号、损坏类型、问题数量";
        Toast.fail("请查看" + message + "是否填写");
      } else {
        console.log("params===");
        console.log(params);
        this.$http
          .post("api/insertOrUpdateReport", {
            SzysReport: params
          })
          .then(function(res) {
            console.log(res);
            if (res.data.errcode == 0) {
              Toast.success(res.data.errmsg);
            } else {
              Toast(res.data.errmsg);
            }
          });
      }
    }
  },
  created() {
    getSignature(this.jsApiList);
  },
  watch: {
    // TODO:判断失效(能输入英文、中文)
    //  判断值只能为正整数
    date: function() {
      const reg = /^[0-9]*[1-9][0-9]*$/;
      if (!reg.test(this.date)) {
        console.log("输入格式错误,请输入正整数");
        Toast("输入格式错误,请输入正整数");
        this.date = "";
        return;
      }
    },
    // 判断值最多只能有一位小数且为正数
    problemNum: function() {
      const reg = /^[0-9]+([.]{1}[0-9]{1})?$/;
      if (!reg.test(this.problemNum)) {
        console.log("输入格式错误,请输入正整数并且只能输入一位小数");
        Toast("输入格式错误,请输入正整数并且只能输入一位小数");
        this.problemNum = "";
        return;
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
