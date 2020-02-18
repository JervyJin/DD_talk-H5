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
            :title="item.name + ''"
            @click="onSelect(item.name)"
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
  components: {},
  data() {
    //这里存放数据
    return {
      componentName: "",
      list: [],
      array: [],
      componentId: "",
      show: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    bus.$on("getType", szysComponent => {
      this.list = szysComponent;
    });
  },
  //方法集合
  methods: {
    getBuilding() {
      if (this.list.length > 0) {
        this.show = true;
        if (this.list.length == 0) {
          this.list.forEach(val => {
            const _this = this;
            _this.array.push({
              id: val.componentId,
              name: val.componentName
            });
          });
        } else {
          this.array = [];
          this.list.forEach(val => {
            const _this = this;
            _this.array.push({
              id: val.componentId,
              name: val.componentName
            });
          });
          this.list = [];
        }
        console.log("array", this.array);
        console.log("array", this.list);
      } else {
        Toast("没有数据,请查看是否选中了部件类型");
        this.componentName = "";
      }
    },
    onSelect(item) {
      this.componentName = item;
      this.show = false;
      this.$emit("getType", item);
    }
  }
};
</script>
<style lang="less" scoped></style>
