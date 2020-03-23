<template>
  <!-- TODO:增加删除、上传状态 -->
  <div class="upload">
    <van-uploader
      v-model="fileList"
      :max-count="count"
      :maxSize="maxSize"
      :deletable="true"
      :before-read="beforeRead"
      :after-read="afterRead"
      @oversize="oversize"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import lrz from "lrz";
// 在图片上传时先压缩，压缩成功后再上传服务器
// 展示上传成功后的图片

export default {
  //import引入的组件需要注入到对象中才能使用
  data() {
    //这里存放数据
    return {
      fileList: [], // 这里是要展示的图片url
      array: [], // 这个array保存的是什么
      imgList: "",
      maxSize: 201965 // 上传的图片最大接受200K
    };
  },
  props: ["count"],
  //方法集合
  methods: {
    // 图片读取前的操作（判断图片类型）
    beforeRead(file) {
      const reg2 = /^(\s|\S)+(jpg|png|jpeg|JPG|PNG|bmp)+$/;
      if (!reg2.test(file.type)) {
        this.$warning("请上传图片");
        return false;
      }
      return true;
    },
    // 图片读取后的操作
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      let UForm = new FormData();
      UForm.append("file", file.file);
      this.uploadImg(UForm, file);
    },
    // 上传图片
    uploadImg(imgFile, file) {
      // 应该是压缩成功后再上传
      this.$http.post("api/file/upload", imgFile).then(res => {
        if (res.data.errcode == 0) {
          file.status = "success";
          file.message = "上传成功";
          //console.log('res url', res.data.url)
          //console.log('this file list', this.fileList)
          // 这里不是往数组中添加了两次
         // this.fileList.push({
         //    url: res.data.url
         // });
          // 这里的是什么
          this.array.push(res.data.url);
          //console.log("fileList", this.fileList);
          //console.log("arSrat", this.array);
        } else {
          file.status = "failed";
          file.message = "上传失败";
        }
      });
    },
    // 压缩图片
    oversize(file) {
      const that = this;
      lrz(file.file, {
        width: 348,
        height: 196,
        quality: 0.8 //自定义使用压缩方式
      })
        .then(function(rst) {
          file.status = "uploading";
          file.message = "上传中...";
          let UForm = new FormData();
          UForm.append("file", rst.origin);
          // 上传图片
          that.uploadImg(UForm, file);
        })
        .catch(function(error) {
          //失败时执行
          Toast.fail("压缩失败:" + error);
        })
        .always(function() {
          //不管成功或失败，都会执行
        });
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
