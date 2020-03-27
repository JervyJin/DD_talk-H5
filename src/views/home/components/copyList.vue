<template>
  <keep-alive>
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
                  <mapContainer ref="map"
                                @getMap="getMap"
                                :text='text'
                                :init="init"/>
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
  </keep-alive>
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
import bus from "js/eventBus";
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
      positionArr: [],
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
      partsId: '',
      imgList: [],
      maxDuration: 3, //录音时长
      oppositeLane: false,
      componentTypeId: ''

    };
  },
  computed: {
    init(){
      return window.init;
    }
  },
  created(){
    this.getUserId();
    bus.$on("getComponentDirection", componentDirection => {
      this.facilitiesDirection = componentDirection;
    });

  },
  mounted() {

  },
  methods: {
    /**
     * todo: 思路
     * 1. getCode() --> 获取code
     * 2. getToken()  --> 获取accessTOken
     * 3. 通过accessToken和code去获取userId
     */
    // 显示程度
    showRate() {
      this.rateShow = true;
    },

    //获取缓存中的用户id
    getUserId(){
      getInfo('userid').then(res => {
        this.reportUserId = res.value;
        console.log(res,'copyList获取的id');
      })
    },

    // 关闭键盘
    close(text) {
      text == "问题数量"
        ? (this.problemNumShow = false)
        : (this.dateShow = false);
    },

    //子设施返回的数据
    getFacility(data, componentDirection) {
      this.facilitiesName = data;
    },

    //部件返回的数据
    getParts(data, id) {
      this.partsName = data;
      this.partsId = id;
    },

    //构件返回的数据
    getBuilding(data, id) {
      this.componentName = data;
      this.componentTypeId = id;
    },

    //损害类型返回的数据
    getDamage(data, companyType) {
      this.damageId = data;
      this.companyType = companyType;
    },

    //地图返回的数据
    getMap(lng, lat, address) {
      this.longitude = lng;
      this.latitude = lat;
      console.log(arguments);
      if(address){
        this.address = address.replace(/\"/g, "");
      } else {
        this.address = '';
      }
    },

    //上传图片返回的数据
    getImg(img) {
      this.imgList = img;
    },

    //提交
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
        partsId: this.partsId,
        componentId: this.componentTypeId,
        damageId: this.damageId,
        latitude: this.latitude,
        longitude: this.longitude,
        place: this.address,
        img1: this.imgList[0] ? this.imgList[0].url : '',
        img2: this.imgList[1] ? this.imgList[1].url : '',
        img3: this.imgList[2] ? this.imgList[2].url : '',
        img4: this.imgList[3] ? this.imgList[3].url : '',
        img5: this.imgList[4] ? this.imgList[4].url : '',
        img6: this.imgList[5] ? this.imgList[5].url : '',
        reportType: 1
      };
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
        console.log(this.facilitiesName,
                  this.partsName,
                this.componentName,this.damageId,this.damageDegree,this.problemNum,this.limitTime);
        Toast.fail("请检查信息是否填写完整！");
      } else if (!reg.test(params.problemNum)) {
        Toast.fail("问题数量只能保留一位小数");
      } else if (!params.company) {
        Toast.fail("该损害无单位！");
      } else {
        console.log("提交的params", params);

        this.$http.post(`${url}/insertOrUpdateReport`, params).then(res => {
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
