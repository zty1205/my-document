<!-- 使用方法参考 /demo/testImgUpload 路由-->
<!-- 双向绑定父组件的属性 默认非必填 如果图片必填则需传入validateKey, rules, requireImg -->
<!-- 编辑回显时 只需使用onShow 方法传入fileData -->
<template>
  <el-form-item :label="label" :label-width="labelWidth" :prop="validateKey" :rules="rules" :required="requireImg">
    <el-upload
      ref="upload"
      class="photo-uploader"
      :data='imgLimit'
      name="img"
      :accept="accept"
      :action="uploadUrl"
      :multiple="false"
      :on-success="onSuccess"
      :on-error="onError"
      :show-file-list="false">
      <img v-if="fid || src" :src="src" class="photo-show">
      <i v-else class="el-icon-plus photo-uploader-icon"></i>
      <div slot="tip" v-if="tip" class="el-upload__tip">{{ tip }}</div>
    </el-upload>
  </el-form-item>
</template>

<script>
  import axios from "axios"

  const baseUrl = process.env.BASE_URL

  export default {
    name: "uploadImage",
    model: {
      prop: "fid",
      event: 'uploadSuccess'
    },
    props: {
      validateKey: {
        type: String
      },
      fid: "",
      requireImg: {
        type: Boolean,
        default: false
      },
      rules: {
        type: Array,
        default: null
      },
      labelWidth: {
        type: String,
        default: "100px"
      },
      label: {
        type: String,
        default: "图片"
      },
      uploadUrl: {
        type: String,
        default: "/api/template/postImg"
      },
      imgLimit: {
        type: Object,
        default: null
      },
      accept: {
        type: String,
        default: "image/*",
        validator: function (value) {
          let regex = /image\/*/
          return regex.test(value)
        }
      },
      tip: {
        type: String,
        default: "请选择图片文件，进行上传"
      }
    },
    data() {
      return {
        src: "",
        src1: `${baseUrl}localStorage/img/1543225530340_90_90.jpg`
      }
    },
    methods: {
      onShow(fileData) {
        this.src = this.src1
      },
      onSuccess(res) {
        if (res && res.rc === 0) {
          this.src = `${baseUrl}` + res.original
          // console.log("in success = ", res[0].fid)
          this.$emit("uploadSuccess", res.original)
          if (this.validateKey && this.$parent && this.$parent.validateField) {
            this.$parent.validateField(this.validateKey)
          }
        } else {
          let message = res.msg || "上传出错"
          this.$message({
            type: "error",
            message: message,
            duration: 1200
          })
        }
      },
      onError(err, file, fileList) {
        console.error(err)
        this.$message({
          type: "error",
          message: err || "上传失败",
          duration: 1500
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
