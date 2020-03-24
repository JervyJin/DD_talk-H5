<template>
  <div class="searchContainer">
    <div>
      <!-- TODO:回车搜索 -->
      <van-search
        v-model="value"
        show-action
        placeholder="请输入设施名"
        @search="onSearch"
        @cancel="onCancel"
      />
      {{content}}
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        :loading-text="loadText"
        :error-text="errorText"
      >
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { setInfo, getInfo } from "js/dd";
export default {
  components: {},
  data() {
    return {
      value: "",
      list: [],
      content: [],
      loading: false,
      finished: true,
      finishedText: "",
      loadText: "加载中",
      errorText: "搜索失败"
    };
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    getInfo('searchContentArr24').then(res => {
      this.content = JSON.parse(res.value).list;
    })
  },
  //方法集合
  methods: {
    onLoad() {},
    onSearch(val) {
      getInfo('searchContentArr24').then(res => {
        if(res.value){
          alert();
          let newArr = JSON.parse(res.value).list;
          newArr.push(val);
          setInfo('searchContentArr24', JSON.stringify({list: newArr}));
          this.content = newArr;
        } else{
          setInfo('searchContentArr24', JSON.stringify({list: [val]}));
        }
      })
    },
    onCancel() {
      // Toast("取消");
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
