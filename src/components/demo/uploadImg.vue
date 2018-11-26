<template>
    <div class="test-box">
      <div>
        <h2>测试封装后的图片上传组件</h2>
      </div>

      <div class="form-box">
        <el-form label-suffix=":" :model="addForm" :rules="rules" ref="addForm" :label-width="labelWidth" class="demo-ruleForm">

          <form-upload-img id="img1" label="图片非必填" ref="img1"
                           :labelWidth="labelWidth" v-model="addForm.fid"></form-upload-img>
          父级fid{{ addForm.fid }}

          <form-upload-img id="img2" label="图片必填" ref="img2" :labelWidth="labelWidth" validateKey="fid2"
                       v-model="addForm.fid2" :requireImg="requireImg2" :rules="[{ validator: requiredImg }]"></form-upload-img>
          父级fid2:{{ addForm.fid2 }}

          <el-form-item>
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button type="primary" @click="clear">清除验证</el-button>
            <el-button type="primary" @click="reset">清空</el-button>
            <el-button type="primary" @click="edit1">赋值非必填</el-button>
            <el-button type="primary" @click="edit2">赋值必填</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
  import formUploadImg from "../common/uploadImage"

  export default {
    name: "testImgUpload",
    components: {formUploadImg},
    data() {
      const requiredImg = (rule, value, callback) => {
        if (!this.addForm.fid2) {
          callback(new Error("请上传图片"))
        } else {
          callback()
        }
      }
      return {
        requiredImg: requiredImg,
        labelWidth: "100px",
        requireImg2: true,
        addForm: {
          title: "",
          fid: "",
          fid2: ""
        },
        rules: null
      }
    },
    methods: {
      submitForm() {
        console.log("in submit from")
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            console.log('form = ', this.addForm)
            this.$message({
              type: "success",
              message: "验证通过",
              duration: 1000
            })
          } else {
            this.$message({
              type: "error",
              message: "验证失败",
              duration: 1000
            })
          }
          return false
        })
      },
      reset() {
        this.addForm = {
          title: "",
          fid: "",
          fid2: ""
        }
        this.$refs["img1"].onShow(null)
        this.$refs["img2"].onShow(null)
        this.$refs.addForm.clearValidate()
      },
      clear() {
        this.$refs.addForm.clearValidate()
      },
      edit1() {
        this.$refs["img1"].onShow()
      },
      edit2() {
        let fileData = {
          fid: 301410819,
          owner: 9209150,
          secret: "a0bb54f0eb19",
          farm: 45,
          fileType: 1005,
          gpsInfo: {
            lati: "30 / 1, 16 / 1, 739 / 100",
            alti: "8579 / 8579",
            long: "120 / 1, 5 / 1, 3267 / 100"
          },
          height: 1280,
          origTime: 1562233459000,
          size: 1839039,
          status: 1,
          width: 960
        }
        this.$refs["img2"].onShow()
      }
    }
  }
</script>

<style lang="scss" scoped>
    .form-box {
        text-align: left;
        margin-left: 20px;
    }
  .inputDialog{
    width: 240px;
  }

  #img1 {
    @include Img_Uploader(100px, 100px, 1)
  }

  #img2 {
    margin-top: 20px;
    @include Img_Uploader(100px, 100px, 1)
  }

  .test-box {
    margin-top: 20px;
    margin-left: 20px;
  }
</style>
