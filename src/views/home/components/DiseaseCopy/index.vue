<template>
    <div style="background: #e5e5e7; height: 100vh;">
        <van-cell>
            <template>
                <van-row>
                    <van-col span="4">
                        <div class="custom-title">问题图</div>
                    </van-col>
                    <van-col span="20">
                        <upload :count="6" @getImg="getImg"></upload>
                    </van-col>
                </van-row>
            </template>
        </van-cell>

        <van-cell>
            <template slot="title">
                <van-row>
                    <van-col span="4">
                        <div class="custom-title">位置</div>
                    </van-col>
                    <van-col span="20">
                        <div class="custom-value address" style="width: 100vw;height: 20vh;">
                            <mapContainer ref="map"
                                          @getMap="getMap"
                                          :init="init"/>
                        </div>
                    </van-col>
                </van-row>
                <div style="text-align: right; margin-right: 10vw;">
                    <router-link to="changeAddress" tag="div" style="color: #99CCFF; margin-top: 10px;">修改位置</router-link>
                </div>
            </template>
        </van-cell>

        <van-cell>
            <template slot="title">
                <van-row>
                    <van-col span="4">
                        <div>设施</div>
                    </van-col>
                    <van-col span="20">
                        <van-field
                                v-model="facilitiesName"
                                readonly
                                placeholder="请输入设施"
                                @click.native="openDialog"
                        />
                    </van-col>
                </van-row>
            </template>
        </van-cell>
    </div>
</template>

<script>
    import upload from "components/upload/upload";
    import mapContainer from "../components/map";
    export default {
        name: "index",
        data(){
            return {
                facilitiesName: ''
            }
        },
        components: {
            upload,
            mapContainer
        },
        computed: {
            init(){
                return window.init;
            }
        },
        methods: {
            getImg(){

            },
            getMap(){

            },
            openDialog(){

            }
        }
    }
</script>

<style scoped>

</style>
