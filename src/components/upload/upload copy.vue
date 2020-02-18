<!--  -->
<template>
  <div class="img-container" v-if="this.img != ''">
    <div class="show-img" v-for="(item,key) in img" :key="key">
      <img :src="item" id="img" alt="暂无图片" />
    </div>
    <div class="upload">
      <div class="content-div img-div">
        <div class="img">
          <div class="add pr" @click="clickFile()">
            <!-- 这个是一个设计的上传按钮的图片 -->
            <img src="../../assets/img/add.png" />
          </div>
          <input
            type="file"
            accept="image/*"
            capture="camera"
            id="upImg"
            class="upImg"
            @change="uploadImg()"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="img-container" v-else>
    <div class="upload">
      <div class="content-div img-div">
        <div class="img">
          <div class="add pr" @click="clickFile()">
            <!-- 这个是一个设计的上传按钮的图片 -->
            <img src="../../assets/img/add.png" />
          </div>
          <input
            type="file"
            accept="image/*"
            capture="camera"
            id="upImg"
            class="upImg"
            @change="uploadImg()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      temp1: [],
      img: []
    };
  },
  methods: {
    /**
     * todo: 上传图片
     * ! 1.点击input调用手机相册  -->  clickFile(√)
     * ! 2.判断上传相册不能超过200k并且小于6张；上传图片  -->  uploadImg()
     */
    clickFile() {
      if (this.temp1.length > 5) {
        Dialog.info("上传的图片不能多于六张");
        return false;
      } else {
        // $("#upImg").click();
        document.getElementById("upImg").click();
      }
    },
    // 上传图片处理
    uploadImg() {
      const files = document.getElementById("upImg").files;
      let obj = {};
      const maxSize = 201965; // 上传的图片最大接受200K
      let UForm = new FormData();
      if (document.getElementById("upImg").files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          obj.name = files[i].name;
          obj.size = files[i].size;
          this.temp1.push(obj);
          UForm.append("file", files[0]); //todo:定义的FormData类型的数据.append('后端要求接收的字段',你传的值)
          // 上传图片
          const _this = this;
          _this.$http.post("api/file/upload", UForm).then(function(res) {
            if (res.data.errcode == 0) {
              const url = res.data.url;
              if (_this.img == "") {
                _this.img.push(url);
              } else {
                console.log("超过两张啦");
                let urls = url;
                _this.img.push(urls);
                console.log(_this.img);
              }
            } else {
              _this.$alert("上传失败");
            }
          });
        }
      } else {
        alert("上传的图片不能少于一张");
      }
    },
    // 上传图片处理
    uploadImgs() {
      const files = document.getElementById("upImg").files;
      let obj = {};
      const maxSize = 201965; // 上传的图片最大接受200K
      let UForm = new FormData();
      if (document.getElementById("upImg").files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          obj.name = files[i].name;
          obj.size = files[i].size;
          this.temp1.push(obj);
          // // TODO: 若图片大于200k时压缩
          // if (files[i].size > maxSize) {
          //   console.log("图片太大需要压缩一下下哦~");
          //   // 压缩图片
          //   let file = files ? files[0] : false;
          //   if (!file) {
          //     return false;
          //   }
          //   if (file) {
          //     // TODO:进不来
          //     lrz(file, {
          //       width: 921, //设置压缩后的最大宽
          //       height: 518,
          //       quality: 0.7, //图片压缩质量，取值 0 - 1，默认为0.7
          //       fileName: "file"
          //     })
          //       .then(function(rst) {
          //         console.log("压缩图片成功");
          //         console.log(rst);
          //         rst.file.name = rst.origin.name;
          //         console.log("压缩后的file:");
          //         console.log(rst.file);
          //         console.log("啦啦啦啦");
          //         var file = new File([rst.file], filename, {
          //           type: contentType,
          //           lastModified: Date.now()
          //         });
          //         console.log("啦啦啦啦111");
          //         console.log(file);
          //         return false;
          //         // UForm.append("file", file);
          //       })
          //       .catch(function(err) {
          //         console.warning("压缩图片时出错");
          //         console.log(err);
          //         return false;
          //       });
          //   }
          // } else {
          //   console.log("图片不需要压缩");
          //   console.log(files);
          //   console.log(files[0]);
          //   UForm.append("file", files[0]); //todo:定义的FormData类型的数据.append('后端要求接收的字段',你传的值)
          // }
          UForm.append("file", files[0]); //todo:定义的FormData类型的数据.append('后端要求接收的字段',你传的值)
          // 上传图片
          const _this = this;
          _this.$http.post("file/upload", UForm).then(function(res) {
            if (res.data.errcode == 0) {
              // console.log(res.data);
              const url = res.data.url;
              // console.log(url);
              _this.imgUrl = url;
              console.log("更改后的imgUrl-->" + _this.imgUrl);
            } else {
              _this.$alert("上传失败");
            }
          });
        }
      } else {
        alert("上传的图片不能少于一张");
      }
    }
  }
};
</script>
<style lang='less' scoped>
/* @import url(); 引入css类 */
// .add img {
//   width: 100%;
// }
// .upImg {
//   width: 62px;
//   height: 62px;
//   position: absolute;
//   top: 81px;
//   right: 40px;
//   border: 1px solid red;
//   display: none;
// }

.img-container {
  display: flex;
  flex-wrap: wrap;
  .show-img,
  .upload {
    width: 80px;
    height: 80px;
    border: 1px solid #eee;
    margin-right: 14px;
    margin-top: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>