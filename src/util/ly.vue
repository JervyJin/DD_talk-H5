<template>
  <div class="about">
    <!-- <p>使用说明</p>
    <img src="../assets/img/map-get.png" alt=""> -->
    <div class="submit-btn">
      <el-button type="primary" :loading="isLoading" @click="initial" >开始录音</el-button>
      <el-button type="primary" :loading="isLoading" @click="play" >播放录音</el-button>
      <el-button type="primary" :loading="isLoading" @click="wz" >转文字</el-button>
      <p>msg: </p>{{msg}}
    </div>
  </div>
</template>

<script>
import * as dd from '@/util/dd'

export default {
  name: 'dw',
  data () {
    return {
      localAudioId: '',
      mediaId: '',
      msg: '',
      isLoading: false,
      jsApiList: [
        'device.audio.startRecord',
        'device.audio.stopRecord',
        'device.audio.onRecordEnd',
        'device.audio.download',
        'device.audio.play',
        'device.audio.pause',
        'device.audio.resume',
        'device.audio.onPlayEnd',
        'device.audio.translateVoice'
      ]
    }
  },
  mounted () {
    // this.initial()
  },
  methods: {
    initial () {
      this.ddconfig()
    },
    ddconfig: function () {
      dd.config(this.jsApiList, () => { // 请求调用api权限
        dd.onRecordEnd((res) => {
          this.mediaId = res.mediaId
          dd.download(res.mediaId, (res) => { // 录音结束后从钉钉远程服务器下载到本地
            this.localAudioId = res.localAudioId
          })
        })// 监听录音停止
        dd.startRecord(2)
      })
    },
    play: function () {
      dd.play(this.localAudioId)
    },
    wz: function () {
      dd.wz(this.mediaId).then(res => {
        this.msg = res.content
      })
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
.submit-btn{
  margin-top: 10px;
}
</style>
