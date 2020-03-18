<template>
  <div class="upload">
    <van-uploader
      v-model="fileList"
      :max-count="count"
      :deletable="false"
      :before-read="beforeRead"
      :after-read="afterRead"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  data() {
    //这里存放数据
    return {
      fileList: [],
      array: [],
      maxSize: 201965 // 上传的图片最大接受200K
    };
  },
  props: ["count"],
  //方法集合
  methods: {
    // 返回布尔值
    beforeRead(file) {
      const reg2 = /^(\s|\S)+(jpg|png|jpeg|JPG|PNG|bmp)+$/;
      if (!reg2.test(file.type)) {
        this.$warning("请上传图片");
        return false;
      }
      return true;
    },
    afterRead(file) {
      let UForm = new FormData();
      UForm.append("file", file.file);
      Toast.success("开始上传");
      this.$http.post("api/file/upload", UForm).then(res => {
        if (res.data.errcode == 0) {
          Toast.success("上传成功");
          this.array.push(res.data.url);
          this.$emit("getImg", this.array);
        } else {
          Toast.fail("上传失败");
        }
      });
    },
    oversize() {
      Toast.fail("超出200k了,即将进行裁剪");
    }
  }
};
</script>
<style lang="less" scoped>
.upload {
  .van-uploader__preview-image {
    width: 80px;
    height: 80px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
