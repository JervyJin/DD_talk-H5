<template>
  <div class="buildingContainer">
    <van-field
      readonly
      v-model="componentName"
      placeholder="沥青混泥土路面-050"
      @click.native="getBuilding"
    />

    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
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
    bus.$on("getSzysComponent", array => {
      if(array.length > 0){
        this.array = array;
        this.componentName = this.array[0].componentName;
        bus.$emit("getSelectDisease", this.array[0].componentTypeId);
      } else {
        this.componentName = '';
        this.array = [];
        this.componentName = '';
        bus.$emit("getSelectDisease", '')
      }
    });
  },
  //方法集合
  methods: {
    getBuilding() {
      this.show = true;
      if (this.array.length == 0) {
        this.array = [];
        this.componentName = "";
        Toast("该部件下无构件，请添加！");
      }
    },
    onSelect(item) {
      bus.$emit("getSelectDisease", item.componentTypeId);
      this.componentName = item.componentName;
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped></style>
