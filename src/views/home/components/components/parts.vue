<template>
  <div class="facilityContainer">
    <van-field
      v-model="partsName"
      readonly
      placeholder="车行道"
      @click.native="openDialog"
    />
    <!-- 展示数据 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-list>
        <div class="list-item">
          <van-cell
            v-for="(item, key) in list"
            :class="{ activeText: partsName == item }"
            :key="key"
            :title="item"
            @click="onSelect(item)"
          />
        </div>
      </van-list>
    </van-popup>
  </div>
</template>
<script>
import bus from "js/eventBus";
import { Toast } from "vant";
export default {
  data() {
    //这里存放数据
    return {
      partsName: "",
      show: false,
      list: [],
      data: [],
      szysComponent: []
      // loading: false, //是否处于加载状态
      // finished: false, //是否已加载完所有数据
      // isLoading: false, //是否处于下拉刷新状态
      // pageNum: 1,
      // pageSize: 10,
      // total: 0,
    };
  },
  created() {
    this.getData();
  },

  //方法集合
  methods: {
    openDialog() {
      // this.list = [];
      this.show = true;
      // if (this.pageNum > 1 || this.total > 0) {
      //   this.pageNum = 1;
      //   this.total = 0;
      // }
    },
    getData() {
      this.$http
        .get("api/selectParts", {
          // params: {
          //   pageNum: this.pageNum,
          //   pageSize: this.pageSize,
          // }
        })
        .then(res => {
          if (res.data.errcode == 0) {
            const obj = res.data.data.content;
            if (obj.length > 0) {
              const _this = this;
              _this.data = obj;
              // if (_this.total < res.data.data.totalNum) {
              // TODO:传值给szysComponent再传给 构件名称-编号
              obj.forEach(value => {
                _this.list.push(value.partsName);
                // _this.szysComponent.push(value.szysComponent);
              });
              // this.loading = false;
              // _this.pageNum++;
              // _this.total++;
              // } else {
              //   this.finished = true;
              // }
            }
          }
        });
    },
    // onRefresh() {
    //   //下拉刷新
    //   // this.isLoading = false;
    //   Toast("刷新完成");
    //   this.list = [];
    //   // if (this.pageNum > 1 || this.total > 0) {
    //   //   this.pageNum = 1;
    //   //   this.total = 0;
    //   // }
    //   this.getData();
    // },
    onSelect(item) {
      this.partsName = item;
      this.show = false;
      for (let i = 0; i < this.list.length; i++) {
        for (let j = 0; j < this.data.length; j++) {
          const self = this;
          if (self.data[j].partsName == self.partsName) {
            console.log("szysComponent", self.data[j].szysComponent);
            if (self.data[j].szysComponent != null) {
              bus.$emit("getType", self.data[j].szysComponent);
              return false;
            } else {
              Toast("构件名称-编号没有数据");
              self.data[j].szysComponent = [];
              return false;
            }
          }
          // return false;
        }
      }
      this.$emit("getType", item);
    }
  }
};
</script>
<style lang="less" scoped></style>
