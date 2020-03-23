import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from "axios";
import "./assets/css/common.css";
import "./assets/css/vant.less";
import * as dd from "dingtalk-jsapi"; // 引用钉钉jsapi
import VueAMap from "vue-amap";
Vue.use(VueAMap);

import {
  Uploader,
  Cell,
  Icon,
  Radio,
  Field,
  Button,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  Step,
  Steps,
  Checkbox,
  Rate,
  PullRefresh,
  List,
  Popup,
  Search,
  NumberKeyboard,
  Dialog,
  RadioGroup,
  NavBar
} from 'vant';
import 'vant/lib/index.css'
Vue.use(Uploader);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(Field);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Checkbox);
Vue.use(Rate);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Popup);
Vue.use(Search);
Vue.use(NumberKeyboard);
Vue.use(Dialog);
Vue.use(NavBar);

VueAMap.initAMapApiLoader({
  // key: "09a4d90ae2506ceac698060c9598ee80",
  key: "a0eb69119261d4a079f78273ecedbbbb",
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch", // POI搜索插件
    "AMap.Scale", // 右下角缩略图插件 比例尺
    "AMap.OverView",
    "AMap.ToolBar", // 地图工具条
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor", // 圆形编辑器插件
    "AMap.Geolocation" // 定位控件，用来获取和展示用户主机所在的经纬度位置
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: "1.4.4",
  uiVersion: "1.0"
});
Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
