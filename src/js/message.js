import Vue from 'vue'
import { ToastPlugin, ConfirmPlugin, AlertPlugin } from 'vux'
import { Msg } from 'vux'

Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
// success, warn, cancel, text
export default {
  install(Vue) {
    Vue.prototype.$success = function (text, width = '10em') {
      this.$vux.toast.show({
        showPositionValue: false,
        text: text,
        type: 'success',
        width: width,
        position: 'middle'
      })
    }

    Vue.prototype.$warning = function (text, width = '15em') {
      this.$vux.toast.show({
        showPositionValue: false,
        text: text,
        width: width,
        type: 'warn',
        position: 'middle'
      })
    }

    Vue.prototype.$info = function (text, width = '15em') {
      this.$vux.toast.show({
        showPositionValue: false,
        text: text,
        width: width,
        type: 'info',
        position: 'middle'
      })
    }

    Vue.prototype.$waiting = function (text, width = '15em') {
      this.$vux.toast.show({
        showPositionValue: false,
        text: text,
        width: width,
        type: 'waiting',
        position: 'middle'
      })
    }

    Vue.prototype.$alert = function (text) {
      this.$vux.alert.show({
        title: '提示',
        content: text,
      })
    }

    Vue.prototype.$confirm = function (text) {
      this.$vux.confirm.show({
        title: '提示',
        content: text,
        confirmText: '确定',
        cancelText: '取消',
      })
    }

  }
}