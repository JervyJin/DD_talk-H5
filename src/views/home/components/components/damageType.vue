<template>
  <div class="facilityContainer">
    <van-field
      v-model="damageName"
      readonly
      placeholder="网裂"
      @click.native="openDialog"
    />
    <!-- 展示数据 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '50%' }"
      @click-overlay="clickModel"
    >
      <div class="list-item">
        <van-cell
                :class="{ activeText: damageName == item }"
                v-for="(item, key) in list"
                :key="key"
                :title="item.damageName + ''"
                @click="onSelect(item)"
        />
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
import bus from "js/eventBus";
export default {
  components: {},
  data() {
    //这里存放数据
    return {
      damageName: "",
      show: false,
      list: [],
      loading: false, //是否处于加载状态
      finished: false, //是否已加载完所有数据
      isLoading: false, //是否处于下拉刷新状态
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  mounted(){
    bus.$on("getSelectDisease", componentId => {
      if(componentId){
        this.$http.get(`${url}/selectDisease`,{
          params: {
            componentId
          }
        }).then(res => {
          if(res.data.errcode === 0){
            if( res.data.data.content.length > 0){
              this.list = res.data.data.content;
              this.damageName = this.list[0].damageName
              this.isLoading = true;
            }else {
              this.list = [];
              this.damageName = '';
            }
          } else{
            Toast(res.data.errmsg)
          }
        })
      } else {
        this.list = [];
        this.damageName = '';
      }
    });
  },

  //方法集合
  methods: {
    openDialog() {
      this.show = true;
      if (this.pageNum > 1 || this.total > 0) {
        this.pageNum = 1;
        this.total = 0;
      }
      if (this.list.length <= 0) {
        Toast("该构件下无损害类型，请添加！");
      }
      this.getData();
    },
    getData() {
    },
    onRefresh() {
      //下拉刷新
      this.isLoading = false;
      Toast("刷新完成");
      this.list = [];
      if (this.pageNum > 1 || this.total > 0) {
        this.pageNum = 1;
        this.total = 0;
      }
      this.getData();
      // this.finished = false;
    },
    onSelect(item) {
      this.damageName = item.damageName;
      console.log("item", item);
      this.show = false;
      this.$emit("getType", item.damageId, item.companyType);
    },
    clickModel() {
      this.list = [];
    }
  }
};
</script>
