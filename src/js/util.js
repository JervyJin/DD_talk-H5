
export default {
  async getQianMing() {
    let jsApiList = [
      "runtime.info",
      // 需要用的
      "device.geolocation.get",
      'device.audio.startRecord', // 开始录音
      'device.audio.stopRecord', // 停止录音
      'device.audio.onRecordEnd',// 监听停止录音
      // 'device.audio.download',  //录音下载
      // 'device.audio.play',  // 播放录音
      "device.audio.translateVoice" // 语音转文字
    ];
    let url = window.location.protocol + "//" + window.location.host + "/";
    console.log("当前地址:");
    console.log(url);
    let res = await $http.get("/getSignature", {
      params: {
        jsUrl: url
      }
    });
    if (res.data.errcode == 0) {
      console.log(res);
      var obj = res.data.data;
      console.log("签名时间戳:" + Number(obj.timeStamp));
      console.log("签名随机串:" + obj.nonceStr);
      console.log("签名:" + obj.signature);
      dd.config({
        agentId: "330059935", // 必填，微应用ID
        corpId: "ding69b3c300f038527a35c2f4657eb6378f", //必填，企业ID
        timeStamp: obj.timeStamp, // 必填，生成签名的时间戳
        nonceStr: obj.nonceStr, // 必填，生成签名的随机串
        signature: obj.signature, // 必填，签名
        jsApiList: jsApiList // 必填，需要使用的jsapi列表，注意：不要带dd。
      });
      dd.error(function (err) {
        alert("鉴权error: " + JSON.stringify(err));
      });

    } else {
      alert("签名不成功:" + res.data.msg);
    }
  },
}