<template>
    <div class="homeContainer">
        <!-- 首页 -->
        <div class="map">
            <div class="search">
                <img
                        src="@/assets/img/icon-search.png"
                        alt="搜索"
                        @click="handleSearch"
                />
            </div>
            <map-container :myId="'vueMap1'" @showDetail="toShowDetail"></map-container>
        </div>

        <div class="list">
            <router-link to="/copyList">
                <img src="@/assets/img/icon-bhcs.png" alt="病害抄送" @click="changeShowMap"/>
            </router-link>
        </div>
        <van-popup
                v-model="showDetail"
                position="bottom"
                :overlay="false"
                @close="closePopup"
                :closeable="true"
                :style="{height: showHeight, paddingTop: '40px'}"
        >
            <van-cell-group>
                <van-cell title="设施名称" center :value="showData.facilityName ? showData.facilityName : ''"/>
                <van-cell title="设施类型" :value="showData.facilityType ? showData.facilityType : ''"/>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="养护单位" :value="showData.curingUtil ? showData.curingUtil : ''"/>
                <van-cell title="养护负责人" :value="showData.curingUtilPer ? showData.curingUtilPer : ''"/>
                <van-cell title="联系电话" :value="showData.curingUtilTel ? showData.curingUtilTel : ''"/>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="设备简介" :value="showData.facilityName ? showData.facilityName : ''"/>
            </van-cell-group>

            <van-cell-group v-if="showMore">
                <van-cell title="现存档案">
                    <van-row style="margin-bottom: 10px">
                        <van-col span="8">111</van-col>
                        <van-col span="8">待处理</van-col>
                        <van-col span="8">查看</van-col>
                    </van-row>
                    <van-row style="margin-bottom: 10px">
                        <van-col span="8">222</van-col>
                        <van-col span="8">待处理</van-col>
                        <van-col span="8">查看</van-col>
                    </van-row>
                    <van-row>
                        <van-col span="8">333</van-col>
                        <van-col span="8">待处理</van-col>
                        <van-col span="8">查看</van-col>
                    </van-row>
                </van-cell>
            </van-cell-group>
            <div style="text-align: left; padding-bottom: 20px; padding-left: 20px; margin-top: 10px;">
                <van-icon name="comment-o" v-if="showMore === false">
                    <a href="#" style="color: #1989fa; margin-left: 10px;" @click="showMoreDetail">查看详情</a>
                </van-icon>
                <van-icon name="comment-o" v-if="showMore === true">
                    <a href="#" style="color: #1989fa; margin-left: 10px;" @click="closePopup">显示地图</a>
                </van-icon>
            </div>
        </van-popup>
        <footer-container></footer-container>
    </div>
</template>

<script>
    import mapContainer from "components/map/map";
    import footerContainer from "components/footer/footer";
    import {getCode, getToken, getInfo, deleteInfo, setInfo} from "js/dd";
    import {Toast} from "vant";

    export default {
        components: {footerContainer, mapContainer},
        data() {
            return {
                showMap: true,
                corpId: "ding69b3c300f038527a35c2f4657eb6378f",
                appkey: "dingkvfxrebe5d5ghcgp",
                reportUserId: '',
                appsecret: "bbKHABz6QHKXqAhJaAzS8o12VYNgCJ4a9LBop6WArP7uSAg6k-Dsa3dugi5FiByu",
                code: "",
                showDetail: false,
                showData: '',
                showHeight: '40%',
                showMore: false,
                activeNames: []
            }
        },
        created() {
          /*  getInfo('userid').then(res => {
                if(res.value === ''){
                    this.getCodes();
                }
            });*/
            this.getCodes();
        },
        methods: {
            handleSearch() {
                this.$router.push("/search");
            },
            changeShowMap() {
                this.showMap = false;
            },
            showMoreDetail() {
                this.showHeight = '80%';
                this.showMore = true;
            },
            getCodes() {
                const _this = this;
                dd.ready(() => {
                    dd.runtime.permission.requestAuthCode({
                        corpId: _this.corpId,
                        onSuccess: function (result) {
                            console.log("获取code成功:", JSON.stringify(result.code));
                            _this.code = result.code;
                            _this.getToken();
                        },
                        onFail: function (err) {
                            console.log("获取code失败:");
                            alert(JSON.stringify(err));
                        }
                    });
                });
                dd.error(error => {
                    alert("error");
                    alert(`dd error: ${JSON.stringify(error)}`);
                });
            },

            toShowDetail(data) {
                this.showDetail = true;
                this.showData = data;
            },
            closePopup() {
                this.showMore = false;
                this.showHeight = '40%';
                this.showDetail = false;
            },
            // 获取accessToken
            getToken() {
                this.$http
                    .get(`${url}/DDLogin/getAccessToken`, {
                        params: {
                            appkey: this.appkey,
                            appsecret: this.appsecret
                        }
                    })
                    .then(res => {
                        if (res.data.errcode == 0) {
                            this.getUserId(res.data.data.content.accessToken);
                            setInfo('userToken', res.data.data.content.accessToken);
                        } else {
                            console.log('获取token失败');
                        }
                    });
            },

            // 获取userId
            getUserId(token) {
                if (!token || !this.code) {
                    console.log('使用的是默认的token code');
                    this.code = "ac95d0e845c3302e9d999f31aef2c869";
                    token = "daac5e9879473cd198e6d627493ee12b";
                }
                this.$http
                    .get(`${url}/DDLogin/getUserid`, {
                        params: {
                            accessToken: token,
                            code: this.code
                        }
                    })
                    .then(res => {
                        console.log('用户数据', res.data.data);
                        if (res.data.data.content.errcode == 0) {
                            setInfo("userid", res.data.data.content.userid);
                            //setInfo("userData", res.data.data.content);
                            this.reportUserId = res.data.data.content.userid;
                        } else {
                            Toast.fail(res.data.data.content.errmsg);
                            console.log("userid错误:", res.data.data.content.errmsg);
                        }
                    });
            },


        }
    };
</script>
<style lang="less" scoped>
    @import "../../assets/css/home.css";

    .map {
        // height: 86vh;
        height: 93vh;

        .search {
            position: absolute;
            right: 23px;
            top: 39px;
            z-index: 11111;
        }
    }

    .list {
        position: absolute;
        bottom: 10%;
        left: 5%;
        z-index: 34;
    }
</style>
