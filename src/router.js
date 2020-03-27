import Vue from 'vue'
import Router from 'vue-router'
import Layout from "./views/layout";

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "/",
          name: "home",
          component: resolve => {
            require(["views/home/home"], resolve);
          },
          meta: { title: '首页', isleftarrow: false }
        },
        {
          path: "/copyList",
          name: "copyList",
          component: resolve => {
            require(["views/home/components/copyList.vue"], resolve);
          },
          meta: { title: '抄告问题', isleftarrow: true },
        },
        {
          path: "/search",
          name: "search",
          component: resolve => {
            require(["views/home/components/search"], resolve);
          },
          meta: { title: '搜索', isleftarrow: true },
        },
        {
          path: "/changeAddress",
          name: "changeAddress",
          component: resolve => {
            require(["views/updateMap/index"], resolve);
          },
          meta: { title: "修改位置" }
        }
      ]
    },
    {
      path: "/processed",
      component: Layout,
      redirect: "/processed",
      children: [
        {
          path: "/processed",
          name: "processed",
          component: resolve => {
            require(["views/processed/processed"], resolve);
          },
          meta: { title: "抄告列表" }
        },
        {
          path: "/dossierDetails",
          name: "dossierDetails",
          component: resolve => {
            require(["views/processed/components/components/dossierDetails"], resolve);
          },
          meta: { title: "案件详情" }
        }
      ]
    },
    {
      path: "/mine",
      component: Layout,
      redirect: "/mine",
      children: [
        {
          path: "/mine",
          name: "mine",
          component: resolve => {
            require(["views/mine/mine"], resolve);
          },
          meta: { title: "我的" }
        },
        {
          path: "/feedBack",
          name: "feedBack",
          component: resolve => {
            require(["views/mine/feedBack"], resolve);
          },
          meta: { title: "意见反馈" }
        },
        {
          path: "/help",
          name: "help",
          component: resolve => {
            require(["views/mine/help"], resolve);
          },
          meta: { title: "使用帮助" }
        },
        {
          path: "/aboutUs",
          name: "aboutUs",
          component: resolve => {
            require(["views/mine/aboutUs"], resolve);
          },
          meta: { title: "关于我们" }
        }
      ]
    }
  ]
})
