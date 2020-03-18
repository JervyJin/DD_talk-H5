<template>
  <div class="buildingContainer">
    <van-field
      readonly
      v-model="componentName"
      placeholder="沥青混泥土路面-050"
      @click.native="getBuilding"
    />

    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '50%' }"
      @click-overlay="clickModel"
    >
      <van-list>
        <div class="list-item">
          <van-cell
            :class="{ activeText: componentId == item.id }"
            v-for="item in array"
            :key="item.id"
            @click="onSelect(item)"
            >{{ item.componentName }}</van-cell
          >
        </div>
      </van-list>
    </van-popup>
  </div>
</template>
<script>
import bus from "js/eventBus";
import { Toast } from "vant";
export default {
  components: {},
  data() {
    //这里存放数据
    return {
      componentName: "",
      array: [],
      componentId: "",
      show: false,
      partsId: "",
      facilityId: ""
    };
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    bus.$on("getComponents", array => {
      this.array = array;
      for (let i = 0; i < array.length; i++) {
        this.componentName = array[0].componentName;
        this.$emit("getType", array[0].componentId);
      }
    });
  },
  //方法集合
  methods: {
    getBuilding() {
      if (this.array.length < 0) {
        Toast("该设施下无构件,请添加");
      }
    },
    onSelect(item) {
      this.componentName = item.componentName;
      console.log("componentId", item.componentId);
      this.$emit("getType", item.componentId);
      this.show = false;
    },
    clickModel() {
      this.array = [];
    }
  }
};
</script>
<style lang="less" scoped></style>
