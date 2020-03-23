const corpId = 'ding69b3c300f038527a35c2f4657eb6378f'
const appkey = 'dingkvfxrebe5d5ghcgp'
const appsecret = 'bbKHABz6QHKXqAhJaAzS8o12VYNgCJ4a9LBop6WArP7uSAg6k-Dsa3dugi5FiByu'
const jsApiList = [
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

module.exports = {
    corpId,
    appkey,
    appsecret,
    jsApiList
};