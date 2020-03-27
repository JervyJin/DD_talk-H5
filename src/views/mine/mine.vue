<!--  -->
<template>
    <div class="mine-container pr">
        <header>
            <div class="header">
                <div class="img">
                    <img :src="this.avatar" alt=""/>
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
    import {Toast} from "vant";
    import {setInfo, deleteInfo, getInfo} from "js/dd";
    import footerContainer from "components/footer/footer";

    export default {
        components: {
            footerContainer
        },
        data() {
            //这里存放数据
            return {
                name: "",
                avatar: "",
                code: "",
                userid: "",
                token: ""
            };
        },
        created() {
            this.getData();
        },
        methods: {
            async getUserData() {
                try {
                    let userid = await getInfo('userid');
                    let userToken = await getInfo('userToken');

                    if(userid.value && userToken.value){
                        this.getName(userToken.value, userid.value);
                    } else {
                        console.log('获取用户id或者token失败');
                    }
                } catch (e) {
                    console.log('mine文件 出现异常');
                }
            },

            async getData(){
                let value = await getInfo('avatar');
                if(value.value === ""){
                    this.getUserData();
                } else {
                    let userNameObj = await getInfo("userName");
                    this.name = userNameObj.value;

                    let avatarObj = await getInfo("avatar");
                    this.avatar = avatarObj.value;
                }
            },

            getName(accessToken, userid) {
                this.$http
                    .get(`${url}/DDLogin/getUserINfo`, {
                        params: {
                            accessToken,
                            userid
                        }
                    })
                    .then(res => {
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
    }
    ;
</script>
<style lang="less" scoped>
    @import "../../assets/css/mine.css";

    .van-cell__title {
        text-align: left;
    }
</style>
