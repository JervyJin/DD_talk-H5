import axios from 'axios'

function getSignature (jsApiList) {
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
            dd.config({
                agentId: '330059935',
                corpId: 'ding69b3c300f038527a35c2f4657eb6378f',
                timeStamp: res.timeStamp,
                nonceStr: res.nonceStr,
                signature: res.signature,
                jsApiList: jsApiList || ['runtime.info']
            })
            alert("鉴权成功 ");
        } else {
            alert("签名不成功:" + res.data.msg);
        }
    }).catch(err => {
        console.log('获取jsapi使用权限失败，错误信息 => ' + err)
    })
}

export {
    getSignature
}