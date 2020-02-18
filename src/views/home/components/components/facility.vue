<template>
  <div class="facilityContainer">
    <van-field
      v-model="facilitiesName"
      readonly
      placeholder="xxx设施"
      @click.native="openDialog"
    />
    <!-- 展示数据 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          loading-text="加载中，请稍后"
          error-text="加载失败"
          @load="getData"
          :offset="10"
        >
          <div class="list-item">
            <van-cell
              :class="{ activeText: facilitiesName == item }"
              v-for="item in list"
              :key="item"
              :title="item + ''"
              @click="onSelect(item)"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  components: {},
  data() {
    //这里存放数据
    return {
      facilitiesName: "",
      show: false,
      list: [],
      loading: false, //是否处于加载状态
      finished: false, //是否已加载完所有数据
      isLoading: false, //是否处于下拉刷新状态
      pageNum: 1,
      pageSize: 10,
      total: 0,
      searchName: ""
    };
  },
  //方法集合
  methods: {
    openDialog() {
      this.show = true;
      if (this.pageNum > 1 || this.total > 0) {
        this.pageNum = 1;
        this.total = 0;
      }
      this.getData();
    },
    getData() {
      this.$http
        .get("api/selectFacility", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            facilityName: this.searchName
          }
        })
        .then(res => {
          if (res.data.errcode == 0) {
            const obj = res.data.data.content;
            if (obj.length > 0) {
              const _this = this;
              if (_this.total < res.data.data.totalNum) {
                obj.forEach(value => {
                  _this.list.push(value.facilityName);
                });
                _this.pageNum++;
                _this.total++;
                this.loading = false;
              } else {
                this.finished = true;
              }
            } else {
              Toast("搜索的信息不存在");
              _this.list = [];
            }
          }
        });
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
      this.facilitiesName = item;
      console.log("item" + item);
      this.show = false;
      this.$emit("getType", item);
    }
  }
};
</script>
