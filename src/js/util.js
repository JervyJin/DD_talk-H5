import axios from 'axios'

function getSignature(jsApiList) {
  const jsUrl = window.location.protocol + '//' + window.location.host + '/'
  axios.get('/api/getSignature', {
    params: {
      jsUrl: jsUrl
    }
  }).then(res => {
    if (res.data.errcode == 0) {
      dd.error(function (err) {
        alert("鉴权error: " + JSON.stringify(err));
        return false
      });
      // const time = res.timeStamp.toString()
      // dd.config({
      //   agentId: '330059935',
      //   corpId: 'ding69b3c300f038527a35c2f4657eb6378f',
      //   timeStamp: time,
      //   nonceStr: res.nonceStr,
      //   signature: res.signature,
      //   jsApiList: jsApiList || ['runtime.info']
      // })
      dd.config({
        agentId: '330059935',
        corpId: 'ding69b3c300f038527a35c2f4657eb6378f',
        timeStamp: res.data.data.timeStamp,
        nonceStr: res.data.data.nonceStr,
        signature: res.data.data.signature,
        jsApiList: jsApiList || ['runtime.info']
      })
    } else {
      alert("签名不成功:" + res.data.msg);
    }
  }).catch(err => {
    console.log('获取jsapi使用权限失败，错误信息 => ' + err)
  })
}
function getCode() {
  const _this = this;
  dd.ready(() => {
    dd.runtime.permission.requestAuthCode({
      corpId: 'ding69b3c300f038527a35c2f4657eb6378f',
      onSuccess: function (result) {
        console.log("code:", JSON.stringify(result.code));
        _this.code = result.code;
        _this.getToken();
      },
      onFail: function (err) {
        alert("fail");
        alert(JSON.stringify(err));
      }
    });
  });
  dd.error(error => {
    alert("error");
    alert(`dd error: ${JSON.stringify(error)}`);
  });
}
export {
  getSignature,
  getCode
}