<!--  -->
<template>
  <div class="copyContainer">
    <div class="content pr">
      <div class="content-div img-div">
        <div class="title">问题图</div>
        <upload-img></upload-img>
      </div>
      <div class="content-div">
        <div class="title">位置</div>
        <map-container></map-container>
      </div>
      <div class="content-div">
        <div class="title">设施</div>
        <facility-container @getType="getFacility"></facility-container>
      </div>
      <div class="content-div">
        <div class="title">设施方向</div>
        <div class="direction">
          <span>
            <input
              type="text"
              readonly
              id="bearing"
              v-model="facilitiesDirection"
              placeholder="北向南"
            />
          </span>
          <span>
            <input type="checkbox" id="check" @change="changeCheckBox" />
          </span>
          <span>
            <input type="text" readonly v-model="address" />
          </span>
        </div>
      </div>
      <div class="content-div">
        <div class="title">部件类型</div>
        <parts-container @getType="getParts"></parts-container>
      </div>
      <div class="content-div">
        <div class="title">构件名称-编号</div>
        <building-container @getType="getBuilding"></building-container>
      </div>

      <div class="content-div">
        <div class="title">损坏类型</div>
        <damage-container @getType="getDamage"></damage-container>
      </div>
      <div class="content-div">
        <div class="title lh-52">
          <div>
            程度
            <i class="iconfont" @click="showBtn">&#xe61b;</i>
          </div>
        </div>
        <div class="text-align-right">
          <rater v-model="damageDegree" :max="4"></rater>
          <div id="info">
            <div v-if="damageDegree == 0">完好，运行正常</div>
            <div v-else-if="damageDegree == 1">轻微</div>
            <div v-else-if="damageDegree == 2">中度，不影响安全</div>
            <div v-else-if="damageDegree == 3">严重，将影响安全</div>
            <div v-else>紧急，已影响安全</div>
          </div>
        </div>
      </div>
      <div class="content-div">
        <div class="title">问题数量</div>
        <div class="flex">
          <input
            type="number"
            v-model="problemNum"
            placeholder="请输入问题数量"
            class="margin-right-10"
          />
          <div>x</div>
        </div>
      </div>
      <div class="content-div">
        <div class="title">处理时限</div>
        <div class="flex">
          <input
            type="number"
            v-model="date"
            placeholder="请输入天数"
            class="margin-right-10"
          />
          <div>天</div>
        </div>
      </div>
      <div class="content-div bdb-none">
        <div class="title">问题描述</div>
        <div class="pr">
          <x-textarea
            :max="300"
            placeholder="请输入病害描述"
            v-model="problemDescribe"
          ></x-textarea>
          <i class="iconfont pa yuyin" @click="shibie">&#xe62e;</i>
        </div>
      </div>
      <div class="btnContainer">
        <div class="btn" @click="submit()">添加</div>
      </div>
    </div>
    <div class="dialog">
      <x-dialog v-model="show" class="dialog-demo" hide-on-blur>
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
      </x-dialog>
    </div>
  </div>
</template>

<script>
import uploadImg from "components/upload/upload";
import mapContainer from "components/map/map";
import facilityContainer from "./components/facility";
import partsContainer from "./components/parts";
import buildingContainer from "./components/building";
import damageContainer from "./components/damageType";
import { XTextarea, Rater, XDialog } from "vux";
import { getSignature } from "util/util.js";
export default {
  components: {
    facilityContainer,
    partsContainer,
    buildingContainer,
    damageContainer,
    XTextarea,
    Rater,
    XDialog,
    uploadImg,
    mapContainer
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
      jsApiList: [
        "runtime.info", //  必须
        // 需要用的
        "device.audio.startRecord",
        "device.audio.stopRecord",
        "device.audio.onRecordEnd",
        "device.audio.download",
        "device.audio.play",
        "device.audio.pause",
        "device.audio.resume",
        "device.audio.onPlayEnd",
        "device.audio.translateVoice"
      ]
    };
  },

  watch: {
    // TODO:判断失效(能输入英文、中文)
    //  判断值只能为正整数
    date: function() {
      const reg = /^[0-9]*[1-9][0-9]*$/;
      if (!reg.test(this.date)) {
        console.log("输入格式错误,请输入正整数");
        this.$warning("输入格式错误,请输入正整数");
        this.date = "";
        return;
      }
    },
    // 判断值最多只能有一位小数且为正数
    problemNum: function() {
      const reg = /^[0-9]+([.]{1}[0-9]{1})?$/;
      if (!reg.test(this.problemNum)) {
        console.log("输入格式错误,请输入正整数并且只能输入一位小数");
        this.$warning("输入格式错误,请输入正整数并且只能输入一位小数");
        this.problemNum = "";
        return;
      }
    }
  },

  methods: {
    // 判断设施方向
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
    // 点击程度
    showBtn() {
      this.$info("点击到啦");
      this.show = true;
    },
    // 点击语音识别
    // TODO:先进行shibie()再鉴权
    shibie() {
      getSignature(this.jsApiList);
      alert("点击到语音识别啦");
      let result = "";
      dd.device.audio.onRecordEnd({
        onSuccess: function(res) {
          result = JSON.stringify(res);
          alert(result);
          res.mediaId; // 停止播放音频MediaID
          res.duration; // 返回音频的时长，单位：秒
        },
        onFail: function(err) {
          result = JSON.stringify(err);
          alert(result);
          dd.device.audio.startRecord({
            maxDuration: this.maxDuration,
            onSuccess: function() {
              alert("录音开始");
            },
            onFail: function(err) {
              console.log("开始录音失败，错误信息 => " + JSON.stringify(err));
              alert("开始录音失败，错误信息 => " + JSON.stringify(err));
            }
          });
        }
      });
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
    // 提交
    submit() {
      // TODO:获取上传图片的URL
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
        this.$alert("请查看" + message + "是否填写");
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
              this.$success(res.data.errmsg);
            } else {
              this.$warning(res.data.errmsg);
            }
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/home.css";
.copyContainer {
  height: 100vh;
  background-color: #ededed;
  overflow-y: scroll;
  font-size: 13px;
  .content {
    width: 95.1%;
    margin: auto;
    .content-div {
      display: flex;
      justify-content: space-between;
      padding: 10px 13px;
      background-color: #fff;
      line-height: 24px;
      .title {
        width: 30%;
        text-align: left;
      }
      .img {
        display: flex;
        flex-wrap: wrap;
        div {
          width: 62px;
          height: 62px;
          background-color: #e5e5e5;
          margin-right: 14px;
          margin-bottom: 8px;
          overflow: hidden;
        }
        div:nth-child(4),
        div:nth-child(5),
        div:nth-child(6) {
          margin-bottom: 0px;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      #problem {
        padding-left: 5px;
      }
      .map,
      #container,
      .amap-page-container {
        height: 153px;
        background-color: red;
      }
      .direction input {
        width: 30%;
      }
    }
    .content-div:not(:last-child) {
      border-bottom: 1px solid #bbb;
    }
    .content-div > div:last-child {
      width: 70%;
      overflow: hidden;
    }

    .yuyin {
      font-size: 24px;
      right: 22%;
      bottom: 1%;
    }

    .btnContainer {
      background-color: #fff;
      padding-top: 25px;
      padding-bottom: 18px;
      .btn {
        width: 48.53%;
        /* height: 37px; */
        line-height: 37px;
        border-radius: 4px;
        background-color: #4090f7;
        color: #fff;
        font-size: 14px;
        text-align: center;
        margin: auto;
        margin: 25px auto 18px auto;
      }
    }
  }

  /deep/ .weui-cell {
    padding: 0 !important;
    border: 1px solid #e8e8e8;
  }
  /deep/ .weui-dialog {
    width: 357px;
    padding: 17px;
    max-width: 500px;
  }
  .cube-textarea-indicator {
    display: block;
    bottom: -9px;
  }
}
</style>
