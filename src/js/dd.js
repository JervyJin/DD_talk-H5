import {request} from './api'
import {get_token, get_userid, get_userInfo} from './url'
import {corpId, appkey, appsecret} from './config'
import {Toast} from 'vant'

let code = ' '

// 获取code
function getCode() {
    dd.ready(() => {
        dd.runtime.permission.requestAuthCode({
            corpId: corpId,
            onSuccess: function (result) {
                console.log('getCode--code', JSON.stringify(result.code))
                code = result.code
                console.log('returncode:', code)
                // getToken();
            },
            onFail: function (err) {
                alert("fail");
                alert(JSON.stringify(err));
            },
        });
        console.log('returncode1:', code)
    });
    dd.error(error => {
        alert("error");
        alert(`dd error: ${JSON.stringify(error)}`);
    });
    console.log('returncode2:', code)
    // return code;
}

// 获取accessToken
function getToken() {
    let params = {
        'appkey': appkey,
        'appsecret': appsecret,
    }
    console.log('appkey', appkey)
    console.log('appsecret', appsecret)
    // return false
    request(get_token, params, 'GET')
        .then(res => {
            if (res.data.data.content.errcode == 0) {
                setInfo('token', res.data.data.content.accessToken)
            } else {
                alert(res.data.data.content.errmsg)
            }
        })
        .catch(err => {

        })
}

// 存取缓存
function setInfo(name, value) {
    dd.util.domainStorage.setItem({
        name: name, // 存储信息的key值
        value: value, // 存储信息的Value值
        onSuccess: function (info) {
            Toast(name + '写入成功')
            console.log(name + "写入成功", JSON.stringify(info));
        },
        onFail: function (err) {
            Toast(name + '写入失败:' + JSON.stringify(err))
            console.log(name + '写入失败:' + JSON.stringify(err))
        }
    });
}

// 获取缓存
 function getInfo(name) {
    return dd.util.domainStorage.getItem({
        name: name, // 存储信息的key值
        onSuccess: function (info) {
        },
        onFail: function (err) {
        }
    });
}

// 删除缓存
function deleteInfo(name) {
    console.log('删除的name', name)
    dd.util.domainStorage.removeItem({
        name: name, // 存储信息的key值
        onSuccess: function (info) {
            Toast(name + '删除成功')
            console.log(name + '删除成功')
        },
        onFail: function (err) {
            Toast.fail(name + '删除失败' + JSON.stringify(err))
            console.log(name + '删除失败' + JSON.stringify(err))
        }
    });
}


export {
    getCode,
    getToken,
    // getUserId,
    // getUserName,
    setInfo,
    getInfo,
    deleteInfo,
}
