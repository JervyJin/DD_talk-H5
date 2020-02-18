<template>
  <div class='upload'>
    <van-uploader
      v-model="fileList"
      :max-count="6"
      :deletable="false"
      :before-read="beforeRead"
      :after-read='afterRead'
    />
    <!-- <van-uploader
      v-model="fileList"
      :max-count="6"
      :max-size='maxSize'
      :deletable="false"
      :before-read="beforeRead"
      :after-read='afterRead'
      @oversize='oversize'
    /> -->
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  data() {
    //这里存放数据
    return {
      fileList: [],
      maxSize: 201965 // 上传的图片最大接受200K
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 返回布尔值
    beforeRead(file) {
      console.log("file", file);
      const reg2 = /^(\s|\S)+(jpg|png|jpeg|JPG|PNG|bmp)+$/;
      if (!reg2.test(file.type)) {
        this.$warning("请上传图片");
        return false;
      } else {
        console.log("type:" + file.type);
      }
      return true;
    },
    afterRead(file) {
      this.$info("开始上传");
      console.log("file:", typeof file.file);
      let UForm = new FormData();
      console.log("UForm:", typeof UForm);
      UForm.append("file", file.file);
      console.log("UForm1:", typeof UForm);
      return false;
      this.$http
        .post("http://121.40.243.200:80/file/upload", file.file)
        .then(function(res) {
          if (res.data.errcode == 0) {
            this.$success("上传成功");
          } else {
            this.$alert("上传失败");
          }
        });
      // this.$http.post("api/file/upload", file.file).then(function(res) {
      //   if (res.data.errcode == 0) {
      //     // console.log(res.data);
      //     // const url = res.data.url;
      //     // console.log(url);
      //     // this.imgUrl = url;
      //     // console.log("更改后的imgUrl-->" + this.imgUrl);
      //     this.$success("上传成功");
      //   } else {
      //     this.$alert("上传失败");
      //   }
      // });
    },
    oversize() {
      this.$warning("超出200k了,即将进行裁剪");
      // Toast.fail("超出200k了,即将进行裁剪");
    }
  }
  //生命周期 - 创建完成（可以访问当前this实例）
  // created() {},
};
</script>
<style lang='less' scoped>
.upload {
  // margin-top: 30px;
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