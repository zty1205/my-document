<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-upload
                ref="img"
                class="photo-uploader"
                name="file"
                :action="uploadUrl"
                :before-upload="beforeUpload"
                :multiple="false"
                :limit="1"
                :on-remove="onRemove"
                :on-exceed="onExceed"
                :on-error="onError"
                :on-success="onSuccess"
                :file-list="fileList">
                <img v-if="form.imgSrc" :src="form.imgSrc" class="photo">
                <i v-else class="el-icon-plus photo-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            uploadUrl: "/api/template/postImg",
            form: {
                name: null,
                imgSrc: null,
            },
            fileList: []
        }
    },
    mounted() {
        this.getInfo()
    },
    methods: {
        getInfo() {
            axios.get("/api/template/img").then(res => {
                console.log("res = ", res)
            }).catch(err => {
                console.error(error)
            })
        },
        beforeUpload() {

        },
        onRemove() {

        },
        onExceed() {

        },
        onError(err, file, fileList) {
            console.error("error = ", err)
        },
        onSuccess(response, file, fileList) {
            console.log("response = ", response)
        },
        onSubmit() {

        }
    }
}
</script>

<style lang="scss" scoped>
 @mixin Photo($W: $PhotoWidth, $H: $PhotoHeight, $Scale: 1, $LH:false) {
    @if $LH{
      line-height: $LH * $Scale;
    }
    width: $W * $Scale;
    height: $H * $Scale;
  }
  $CoverWidth: 495px;
  $CoverHeight: 495px;

  .photo-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .photo-uploader /deep/ .el-upload:hover {
    border-color: #409eff;
  }
  .photo-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    @include Photo($CoverWidth, $CoverWidth, 0.2, $CoverHeight);
    text-align: center;
  }
  .photo {
    display: block;
    margin: 0 auto;
    @include Photo($CoverWidth, $CoverWidth, 0.2, $CoverHeight);
  }
</style>
