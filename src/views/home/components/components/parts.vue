<template>
  <div class="facilityContainer">
    <van-field
      v-model="partsName"
      readonly
      placeholder="车行道"
      @click.native="getData"
    />
    <!-- 展示数据 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-list
        finished-text="没有更多了"
        loading-text="加载中，请稍后"
        error-text="加载失败"
        :offset="10"
      >
        <div class="list-item">
          <van-cell
            :class="{ activeText: partsName == item.partsName }"
            v-for="(item, key) in szysComponent"
            :key="key"
            @click="onSelect(item)"
          >
            {{ item.partsName }}
          </van-cell>
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
      szysComponent: []
    };
  },
  mounted() {
    bus.$on("getParts", partsContent => {
      console.log("接收到的parts", partsContent);
      this.szysComponent = partsContent;
      for (let i = 0; i < partsContent.length; i++) {
        this.partsName = partsContent[0].partsName;
        bus.$emit("getComponents", partsContent[0].szysComponent);
      }
    });
  },
  //方法集合
  methods: {
    getData() {
      this.show = true;
      if (this.szysComponent.length == 0) {
        Toast("该设施下无部件类型,请添加");
      }
    },
    onSelect(item) {
      console.log("szysComponent", item.szysComponent);
      bus.$emit("getComponents", item.szysComponent);
      this.partsName = item.partsName;
      this.$emit("getParts", item.partsId);
      this.show = false;
    }
  }
};
</script>
