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
      <div style="padding: 10px" v-if="content.length > 0">
        <div style="text-align: left;
                    padding-left: 2vw;
                    padding-top: 5px;
                   border-radius: 5px;
                    background: gainsboro;">
          <van-row>
            <van-col span="22">
              <van-tag v-for="(item, index) in content"
                       style="margin-left: 10px; font-size: 14px; margin-bottom: 5px;"
                       @click="onSearch(item)"
                       :key="index">
                {{item}}
              </van-tag>
            </van-col>
            <van-col span="2">
              <van-icon name="delete" @click="deleteHistory"/>
            </van-col>
          </van-row>

        </div>
      </div>

      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        :loading-text="loadText"
        :error-text="errorText"
      >
        <van-cell v-for="item in list"
                  :key="item.facilityId"
                  :title="item.facilityName"
                  @click="toShowMap(item)"
                  :border="false" style="background: #F7F8FA"/>
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
      newContent: [],
      loadText: "加载中",
      errorText: "搜索失败",
      keyName: 'keyhhhhhh22333'
    };
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    let self = this;
    getInfo(self.keyName).then(res => {
      self.content = JSON.parse(res.value).list;
    })
  },
  //方法集合
  methods: {
    onSearch(val) {
    this.finished = false;
     this.$http.get(`${url}/facility/sonFacilityByName`,{
       params: {
         facilityName: val
       }}
     ).then(res => {
       this.list = res.data.data.content;
       this.finished = true;
     }).catch(e => {
       console.log(e);
     });
    },

    toShowMap(item){
      let self = this;
      dd.util.domainStorage.getItem({
        name: self.keyName , // 存储信息的key值
        onSuccess : function(res) {
          if(res.value){
            let oldContent = JSON.parse(res.value).list;
            let index = oldContent.findIndex(item2 => {
              return item2 === item.facilityName
            });
            if(index !== -1){
              return
            }
            self.newContent = [...oldContent, item.facilityName];
            dd.util.domainStorage.setItem({
              name: self.keyName ,
              value: JSON.stringify({list: self.newContent})
            });
          } else {
            dd.util.domainStorage.setItem({
              name: self.keyName ,
              value: JSON.stringify({list: [item.facilityName]})
            });

          }
        },
        onFail : function(err) {
          console.log('获取缓存失败', err);
        }
      });
      this.$router.push({name: 'home', params:{data: item}});
    },

    onCancel() {
      // Toast("取消");
      this.$router.go(-1);
    },

    deleteHistory(){
      let self = this;
      dd.util.domainStorage.removeItem({
        name: self.keyName, // 存储信息的key值
        onSuccess : function(info) {
          Toast('清除搜索历史成功')
          self.content = [];
        },
        onFail : function(err) {
          Toast('清除搜索历史失败')
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
