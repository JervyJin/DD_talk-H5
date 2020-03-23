<template>
  <div class="facilityContainer">
    <van-field
      v-model="facilitiesName"
      readonly
      placeholder="请输入设施"
      @click.native="openDialog"
    />
    <!-- 展示数据 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '50%' }"
      @click-overlay="clickModel"
    >
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-search
          v-model="searchName"
          placeholder="请输入设施名称"
          input-align="center"
          @input="searchFacility"
        />
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
              :class="{ activeText: facilitiesName == item.facilityName }"
              v-for="(item, key) in list"
              :key="key"
              @click="onSelect(item)"
            >
              {{ item.facilityName }}
            </van-cell>
          </div>
        </van-list>
      </van-pull-refresh>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
import bus from "js/eventBus";
let id = "";
export default {
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
    },
    // 获取所有设施
    getData() {
      let latitude = "";
      let longitude = "";
      if (!this.$parent.longitude || !this.$parent.latitude) {
        latitude = 120.195662;
        longitude = 30.39472;
      } else {
        latitude = this.$parent.latitude;
        longitude = this.$parent.longitude;
      }
      this.list = [];
      this.$http
        .get("api/selectFacilityByLonLat", {
          params: {
            longitude: longitude,
            latitude: latitude
          }
        })
        .then(res => {
          if (res.data.errcode == 0) {
            // console.log("content", res.data.data.content);
            res.data.data.content.forEach(value => {
              // console.log("value", value);
              this.list.push(value);
            });
            this.finished = true;
          } else {
            // 缺少查询参数
            Toast(res.data.errmsg);
            this.finished = true;
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 搜索设施名
    searchFacility() {
      this.$http
        .get("api/selectAllSonFacility", {
          params: {
            facilityName: this.searchName
          }
        })
        .then(res => {
          if (res.data.errcode == 0) {
            this.list = [];
            if (JSON.stringify(res.data.data.content) === "[]") {
              Toast("暂无" + this.searchName + "设施，请添加");
            } else {
              res.data.data.content.map(value => {
                this.list.push(value);
              });
            }
            this.finished = true;
          } else {
            Toast("失败:", res.data.errmsg);
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
      this.facilitiesName = item.facilityName;
      this.$emit("getType", item.facilityName, item.componentDirection);
      bus.$emit("getParts", item.szysPartsVos);
      this.show = false;
    },
    clickModel() {
      this.list = [];
      this.searchName = "";
    }
  }
};
</script>
