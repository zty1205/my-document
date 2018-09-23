<template>
    <div>
        <el-row class="container">
            <div class="file-box">
                <input type="file" name="file" @change="getResource($event)" class="file-btn">
                <span class="file-title">点击上传</span>
            </div>
            <div v-if="fileName" class="resources-item">
                <a class="upload-item">
                    <i class="el-icon-document"></i>
                    <span class="item-name">{{ fileName }}</span>
                </a>
            </div>
        </el-row>
        <el-row v-if="fileName" class="reader-box">
            <div>
                <el-button type="primary" @click="go()">
                <span class="fs-14">FileReader</span>
                </el-button>
            </div>

            <p class="fs-14">状态： {{ state }}</p>
            
            <div v-if="showProgress">
                <el-progress :percentage="percentage" color="yellow"></el-progress>
            </div>
        </el-row>
        <el-row class="left">
            <div v-if="imgSrc">
                <img class="img" :src="imgSrc" :alt="fileName" />
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        const _this = this
        let fileReader = new FileReader();
        const isPhoto = /image\/*/
        // fileReader的方法都默认返回一个 ProgressEvent对象 详情查看 ./fileReaderProgressEvent.js
        fileReader.onloadstart = function(e) {
            _this.state = "loadstart"
            _this.percentage = 0;
            _this.showProgress = true;
        }
        fileReader.onloadend = function(e) {
            _this.state = "loadend"
        } 
        fileReader.onerror = function(e) {
            _this.$message({
                type: "error",
                message: "FileReader in Error"
            })
            _this.state = "error"
        }
        fileReader.onabort = function(e) {
            _this.state = "abort"
        }
        fileReader.onload = function (e) {
            _this.state = "load"
            if(isPhoto.test(_this.fileType)) {
                _this.imgSrc = this.result // this 指向 fileReader对象
            }
        }
        fileReader.onprogress = function (e) {
            _this.percentage = (e.loaded / e.total) * 100
        }
        return {
            fileName: null,
            state: "init",
            percentage: 0,
            showProgress: true,
            fileType: null,
            imgSrc: null,
            fileReader: fileReader,
            isPhoto: isPhoto
        }
    },
    methods: {
        go() {
            this.percentage = 0;
            this.showProgress = true
            let dom = document.querySelectorAll(".file-btn")[0]
            if(this.isPhoto.test(this.fileType)) {
                this.fileReader.readAsDataURL(dom.files[0])
            } else {
                this.fileReader.readAsText(dom.files[0], "GBK")
            }
        },
        getResource(event ) {
            this.init();
            let file = event.target.files[0];
            this.fileType = file.type;
            this.fileName = file.name;
                      
        },
        init() {
            this.fileName = null
            this.state = "init"
            this.percentage = 0
            this.showProgress = false
            this.fileType = null
            this.imgSrc = null
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    margin-top: 100px;
    text-align: left;
}
.file-box {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    -webkit-appearance: none;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    padding: 8px 16px;
    font-size: 12px;
    border-radius: 3px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .file-btn{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    outline: none;
    background-color: transparent;
    filter:alpha(opacity=0);
    -moz-opacity:0;
    /*-khtml-opacity: 0;*/
    opacity: 0;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
  }
.file-title {
    font-size: 16px;
    cursor: pointer;
}
.resources-item {
    display: inline-block;
    margin-left: 10px;

    .upload-item {
      color: #606266;
      display: inline-block;
      margin-right: 40px;
      overflow: hidden;
      padding-left: 4px;
      text-overflow: ellipsis;
      -webkit-transition: color .3s;
      transition: color .3s;
      white-space: nowrap; 
    }
    .upload-item  /deep/ .el-icon-document {
        font-size: 28px;  
    }
    .item-name {
        margin-left: 8px;
        font-size: 28px;
    }
  }
  .reader-box {
    margin-top: 10px;
    text-align: left;
  }
  .left {
      text-align: left;
  }
  .img {
      width: 200px;
      height: 200px;
  }
</style>

