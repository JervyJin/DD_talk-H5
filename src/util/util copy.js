import axios from 'axios'
// 鉴权
const getSignature = (jsApiList, callback) => {
    const jsUrl = window.location.protocol + '//' + window.location.host + '/'
    axios.get('/getSignature', {
        params: {
            jsUrl: jsUrl
        }
    }).then(res => {
        dd.config({
            agentId: agentId,
            corpId: corpId,
            timeStamp: res.timeStamp,
            nonceStr: res.nonceStr,
            signature: res.signature,
            jsApiList: jsApiList || ['runtime.info']
        })
        dd.ready(() => {
            if (typeof callback !== 'undefine') callback()
        })
    }).catch(err => {
        console.log('获取jsapi使用权限失败，错误信息 => ' + err)
    })
}
// 开始录音
const startRecord = (maxDuration, callback) => {
    dd.device.audio.startRecord({
        maxDuration: maxDuration,
        onSuccess: function () {
            if (typeof callback === 'function') callback()
            console.log('录音开始')
            alert('录音开始')
        },
        onFail: function (err) {
            console.log('开始录音失败，错误信息 => ' + JSON.stringify(err))
            alert('开始录音失败，错误信息 => ' + JSON.stringify(err))
        }
    })
}
// 结束录音
const onRecordEnd = function (callback) {
    console.log('监听开始')
    dd.device.audio.onRecordEnd({
        onSuccess: function () {
            if (typeof callback === 'function') callback(res)
            alert(JSON.stringify(res))
        },
        onFail: function (err) {
            console.log('监听失败，错误信息 => ' + JSON.stringify(err))
            alert('监听失败，错误信息 => ' + JSON.stringify(err))
        }
    })
}
// 语音转文字
const getRecord = (mediaId, duration) => {
    console.log('监听开始')
    dd.device.audio.translateVoice({
        mediaId: mediaId,
        duration: duration,
        onSuccess: function (res) {
            resolve(res)
        },
        onFail: function (err) {
            reject(err)
        }
    })
}

export {
    getSignature,
    // getMap,
    // view,
    // locate,
    startRecord,
    onRecordEnd,
    getRecord,
}