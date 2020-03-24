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
                <mapContainer ref="map" @getMap="getMap" :text='text'/>
              </div>
            </template>
            <div>
              <router-link to="changeAddress" tag="div">修改位置</router-link>
            </div>
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
                  placeholder="请输入问题数量"
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
                  placeholder="请输入处理时限"
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
import { getCode, getToken, getInfo, deleteInfo, setInfo } from "js/dd";
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
      text : true ,
      dateShow: false, //天数数字键盘
      problemNumShow: false, //问题数量数字键盘
      rateShow: false, //程度级别
      reportUserId: "", //上报人
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
      corpId: "ding69b3c300f038527a35c2f4657eb6378f",
      appkey: "dingkvfxrebe5d5ghcgp",
      appsecret:
        "bbKHABz6QHKXqAhJaAzS8o12VYNgCJ4a9LBop6WArP7uSAg6k-Dsa3dugi5FiByu",
      code: ""
    };
  },
  mounted() {
    // let code = "";
    // if (!code) {
    //   code = getCode();
    // }
    // console.log("code:", code);
    this.getCodes();
  },
  methods: {
    /**
     * todo: 思路
     * 1. getCode() --> 获取code
     * 2. getToken()  --> 获取accessTOken
     * 3. 通过accessToken和code去获取userId
     */
    changeText(){
      this.text = false;
    },
    getCodes() {
      const _this = this;
      dd.ready(() => {
        dd.runtime.permission.requestAuthCode({
          corpId: _this.corpId,
          onSuccess: function(result) {
            // console.log("code:", JSON.stringify(result.code));
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
            // console.log("accessToken", res.data.data.content.accessToken)
            this.getUserId(res.data.data.content.accessToken);
          }
        });
    },
    // 获取userId
    getUserId(token) {
      if (!token || !this.code) {
        this.code = "ac95d0e845c3302e9d999f31aef2c869";
        token = "daac5e9879473cd198e6d627493ee12b";
      }
      console.log('token',token);
      console.log('code',this.code);
      this.$http
        .get("api/DDLogin/getUserid", {
          params: {
            accessToken: token,
            code: this.code
          }
        })
        .then(res => {
          console.log(res);
          console.log('11111111111111111111');
          //setInfo(res);
          if (res.data.data.content.errcode === 0) {
            // alert("userid获取成功");
            setInfo("userid", res.data.data.content.userid);
            this.reportUserId = res.data.data.content.userid;
          } else {
            Toast.fail(res.data.data.content.errmsg);
            console.log("userid错误:", res.data.data.content.errmsg);
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
    getFacility(data, componentDirection) {
      // console.log("父组件设施为:" + data);
      this.facilitiesName = data;
      this.facilitiesDirection = componentDirection;
    },
    getParts(data) {
      // console.log("部件类型父组件数据===" + data);
      this.partsName = data;
    },
    getBuilding(data) {
      // console.log("构件编号父组件数据===" + data);
      this.componentName = data;
    },
    getDamage(data, companyType) {
      // console.log("损坏父组件数据===" + data);
      this.damageId = data;
      this.companyType = companyType;
    },
    getMap(lng, lat, address) {
      this.longitude = lng;
      this.latitude = lat;
      address = address.replace(/\"/g, "");
      this.address = address;
    },
    getImg(img) {
      console.log("img", img);
      this.imgList = img;
    },
    submit() {
      if (!this.latitude || !this.longitude || !this.address) {
        this.latitude = 120.195662;
        this.longitude = 30.39472;
        this.address = "杭州市路桥集团有限公司";
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
      // console.log("params", params);
      let reg = /^[0-9]+([.]{1}[0-9]{1})?$/;
      if (!this.reportUserId) {
        Toast.fail("用户id为空");
      } else if (!params.img1) {
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
        // console.log("params11", params);
      } else if (!reg.test(params.problemNum)) {
        Toast.fail("问题数量只能保留一位小数");
      } else {
        // console.log("提交的params", params);
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
