<template>
  <div class="formBody g-page-wrapper">
    <div class="collapseForm">
      <!-- 顶部搜索栏 -->
      <el-form label-position="right" label-width="searchFromLabelWidth" :inline="true" auto-complete="off" :model="searchFormModel" ref="searchFormModel" :rules="searchFormRules">
        <el-form-item label="ID" prop="id" :rules="[{ validator: checkName, trigger: 'change'}]">
          <el-input type="text" v-model.number="searchFormModel.id" @keyup.enter.native="onSearch(currentPage, true)"></el-input>
        </el-form-item>

        <el-form-item label="模板名称" prop="name">
          <el-input type="text" v-model="searchFormModel.name" @keyup.enter.native="onSearch(currentPage, true)"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="searchFormModel.status">
            <el-option label="正常" value="0"></el-option>
            <el-option label="已删除" value="1"></el-option>
            <el-option label="全部" value=""></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="加入时间">
          <el-date-picker
            v-model="searchFormModel.timeRange"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSearch()">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="onAdd">添加</el-button>
        </el-form-item>
      </el-form>

      <!-- 中部表格 -->
      <el-table :data="tableData" :height="tableConfig.gridHeight" ref="table" row-key="tmpId">
        <el-table-column prop="tmpId" label="ID" align="center" width="100" sortable></el-table-column>

        <el-table-column prop="basics" label="模板名称" align="center" min-width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.basics && scope.row.basics.name" > {{  scope.row.basics.name}} </span>
            <span v-else>----</span>
          </template>
        </el-table-column>

        <el-table-column prop="material" label="主题名称" align="center" min-width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.material && scope.row.material.title" > {{  scope.row.material.title}} </span>
            <span v-else>----</span>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态" align="center" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 0" type="success">正常</el-tag>
            <el-tag v-else type="danger">已删除</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="主题封面图" align="center" prop="basics" min-width="160">
          <template slot-scope="scope">
            <viewer v-if="scope.row.material && scope.row.material.thumb" :images="[scope.row.material.thumb]">
              <img class="photo" :src="imgSrcFilter(scope.row.material.thumb)">
            </viewer>
            <span v-else>----</span>
          </template>
        </el-table-column>

        <el-table-column prop="basics" label="加载页" align="center" min-width="260">
          <template slot-scope="scope">
            <div v-if="scope.row.material && scope.row.material.style == 1" class="pageShow">
              <el-progress :percentage="35" color="yellow"></el-progress>
              <img :class="[scope.row.material.thumb ? imgAttachOne : imgAttachTwo]" :src="imgSrcFilter(scope.row.material.loadingPicture)">
              <p> {{ scope.row.material.loadingText || "" }}</p>
            </div>
            <div v-else>
              <p>默认</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="load" label="保存页" align="center" min-width="260">
          <template slot-scope="scope">
            <div v-if="scope.row.material && scope.row.material.style == 1" class="pageShow">
              <el-progress :percentage="35" color="yellow"></el-progress>
              <img :class="[scope.row.material.thumb ? imgAttachOne : imgAttachTwo]" :src="imgSrcFilter(scope.row.material.producingPicture)">
              <p> {{ scope.row.material.producingText || "" }}</p>
            </div>
            <div v-else>
              <p>默认</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" min-width="160">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="materialEdit(scope.row)">
              素材编辑
            </el-button>
            <el-button type="text" size="small" @click.native.prevent="templateEdit(scope.row)">
              模板编辑
            </el-button>
            <el-button v-if="scope.row.status == 0" type="text" size="small" @click.native.prevent="templateDelete(scope.row.tmpId)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination @current-change="handleCurrentChange"
                       :page-size="pageSize" :current-page.sync="currentPage"
                       layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

      <!-- 基础数据对话框 -->
      <el-dialog :title="dialogTitle" id="mvDialog" ref="addMVDialog" :visible.sync="dialogVisible" width="1000px" :before-close="handleDialogCancel" :close-on-click-modal="false" top="80px">
        <el-form :model="dialogForm" ref="dialogForm" label-position="right" :label-width="labelWidth" label-suffix="：" auto-complete="off">

          <el-form-item label="模板名称" prop="name" :rules="[{required: true, validator: checkName, trigger: 'blur'}]">
            <el-input class="input-dialog" v-model="dialogForm.name"></el-input>
            <span class="title-info">不超过10个字</span>
          </el-form-item>


          <el-form-item label-width="0px">
            <el-col :span="nine">
              <el-form-item label="最少照片数量" prop="minFileCount" :rules="[{required: true, validator: checkMinNumber, trigger: 'change'}]">
                <el-input v-model="dialogForm.minFileCount" class="input-dialog"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="nine" :offset="three">
              <el-form-item label="最多照片数量" prop="maxFileCount" :rules="[{required: true, validator: checkMaxNumber, trigger: 'change'}]">
                <el-input v-model="dialogForm.maxFileCount" class="input-dialog"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label-width="0px">
            <el-col :span="nine">
              <el-form-item label="文件贴片（IOS）" prop="iosTextClipListJson" >
                <el-input  type="textarea" :autosize="{ minRows: 2, maxRows: 15}" v-model="dialogForm.iosTextClipListJson" class="input-dialog"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="nine" :offset="three">
              <el-form-item label="文件贴片（Android）" prop="androidTextClipListJson">
                <el-input  type="textarea" :autosize="{ minRows: 2, maxRows: 15}" v-model="dialogForm.androidTextClipListJson" class="input-dialog"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="背景音乐"  prop="mp3FileList" :rules="[{required: true, validator: needMP3, trigger: 'blur'}]">
            <el-upload
              ref="mp3Upload"
              class="upload-demo"
              drag
              :action='apiContext + "/mv/uploadMP3"'
              multiple
              :on-remove="handleMp3Remove"
              :auto-upload="false"
              :file-list="mp3FileList"
              :limit="20"
              accept="audio/mpeg"
              name="mp3"
              :on-change="onMp3Change"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传mp3文件，且不超过20MB</div>
            </el-upload>
          </el-form-item>

          <el-form-item label="模板资源" prop="resources" :rules="[{required: true, validator: needZip, trigger: 'blur'}]">
            <el-row v-for="(item, index) in dialogForm.resources" style="position: relative;" :key="index">

              <div v-if="item.status == 0">
                <div class="border-container">
                  <el-form-item label="资源包" label-width="100px" :prop="'resources.' + index + '.name'" :rules="[{required: true, message: '请上传资源包', trigger: 'blur'}]">
                    <div tabindex="0" class="file-box">
                      <input type="file" name="file" @change="getResource($event, index)" class="file-btn" accept="application/zip"><span>点击上传zip包</span>
                    </div>
                    <div v-if="item.name" class="resources-item">
                      <a class="upload-item">
                        <i class="el-icon-document"></i>
                        <span class="ml10">{{ getUrl(item.name, 1) }}</span>
                        <i class="el-icon-delete icon-upload-delete" @click="deleteResourceFile(index)"></i>
                      </a>
                    </div>
                  </el-form-item>

                  <el-form-item label="version" label-width="100px" :prop="'resources.' + index + '.version'" :rules="[{required:true, validator: uniqueVersion, trigger: 'change'}]">
                    <el-input v-model="item.version" class="input-small-dialog"></el-input>
                    <div class="version-link">
                      <a target="_blank" href="http://47.96.254.39:8090/pages/viewpage.action?pageId=3252385">模板version详情</a>
                    </div>
                  </el-form-item>
                </div>

                <div v-if="dialogForm.resources.length === 1">
                  <el-button  @click.native.prevent="addResource(index)" type="primary">添加</el-button>
                </div>
                <div v-else-if="dialogForm.resources.length-1 === index">
                  <el-button  @click.native.prevent="deleteResource(index)" type="danger">删除</el-button>
                  <el-button  @click.native.prevent="addResource(index)" type="primary">添加</el-button>
                </div>
                <div v-else>
                  <el-button  @click.native.prevent="deleteResource(index)" type="danger">删除</el-button>
                </div>
              </div>
            </el-row>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleDialogCancel">关 闭</el-button>
          <el-button type="primary" @click="handleDialogSure">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 素材对话框 -->
      <el-dialog title="素材编辑" id="materialDialog" ref="materialDialog" :visible.sync="materialDialogVisible" width="720px" top="80px" :before-close="materialDialogCancel" :close-on-click-modal="false">
        <el-form :model="materialForm" ref="materialForm" :label-position="right" :label-width="lw" label-suffix="："
                 :rules="materialFormRules" auto-complete="off">

          <el-form-item prop="title" label="主题名称" :rules="[{required: true, validator: checkTitle, trigger: 'blur'}]">
            <el-input class="input-dialog" v-model="materialForm.title"></el-input>
            <span class="title-info">不超过5个字</span>
          </el-form-item>

          <el-form-item label="主题封面图" prop="thumb" :rules="[{required: true, message: '请上传封面图', trigger: 'change'}]">
            <el-upload
              ref="thumb"
              class="cover-photo-uploader"
              :data='thumbnailData'
              name="files"
              :action="uploadUrl"
              :before-upload="beforeUploadThumb"
              :multiple="false"
              :limit="1"
              :on-remove="onRemoveThumb"
              :on-exceed="onExceedThumb"
              :on-success="successUploadThumb">
              <img v-if="materialForm.thumb" :src="materialForm.thumbSrc" class="cover-photo">
              <i v-else class="el-icon-plus cover-photo-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">jpg或png,像素495*495,大小不超过50K</div>
            </el-upload>
          </el-form-item>

          <el-form-item label="加载页样式" prop="style" :rules="[{required: true, message: '请选择样式', trigger: 'change'}]">
            <el-radio-group v-model="materialForm.style" @change="changeStyle($event)">
              <el-radio :label="0">默认</el-radio>
              <el-radio :label="1">自定义</el-radio>
            </el-radio-group>
          </el-form-item>

          <div v-if="materialForm.style == 1">
            <el-form-item label="加载页图片" prop="loadingPicture" :rules="[{required: true}]">
              <el-upload
                ref="loadingPicture"
                class="page-photo-uploader"
                :data='pictureData'
                name="files"
                :action="uploadUrl"
                :before-upload="beforeUploadLoadingPicture"
                :multiple="false"
                :limit="1"
                :on-remove="onRemoveLoadingPicture"
                :on-exceed="onExceedLoadingPicture"
                :on-success="successUploadLoadingPicture">
                <img v-if="materialForm.loadingPicture" :src="materialForm.loadingPictureSrc" class="page-photo">
                <i v-else class="el-icon-plus page-photo-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">png,像素132*132,大小不超过20K</div>
              </el-upload>

            </el-form-item>

            <el-form-item prop="loadingText" label="加载页文字" :rules="[{required: true, validator: maxLength, trigger: 'blur'}]">
              <el-input class="input-dialog" v-model="materialForm.loadingText"></el-input>
              <span class="title-info">不超过14个字</span>
            </el-form-item>

            <el-form-item label="保存页图片" prop="producingPicture"  :rules="[{required: true}]">
              <el-upload
                ref="producingPicture"
                class="page-photo-uploader"
                :data='pictureData'
                name="files"
                :action="uploadUrl"
                :before-upload="beforeUploadProducingPicture"
                :multiple="false"
                :limit="1"
                :on-remove="onRemoveProducingPicture"
                :on-exceed="onExceedProducingPicture"
                :on-success="successUploadProducingPicture">
                <img v-if="materialForm.producingPicture" :src="materialForm.producingPictureSrc" class="page-photo">
                <i v-else class="el-icon-plus page-photo-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">jpng,像素132*132,大小不超过20K</div>
              </el-upload>

            </el-form-item>

            <el-form-item prop="producingText" label="保存页文字" :rules="[{required: true, validator: maxLength, trigger: 'blur'}]">
              <el-input class="input-dialog" v-model="materialForm.producingText"></el-input>
              <span class="title-info">不超过14个字</span>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="materialDialogCancel">关 闭</el-button>
          <el-button type="primary" @click="materialDialogSure">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  // import this.$http from "api/config"
  // import this.$httpOne from "this.$http"
  // import qbbUtil from '@/utils/common'
  // import mvUtils from '@/components/authoringTools/mv/mvUtils'
  // import { checkNumber } from '@/utils/rules'
  import { Loading } from 'element-ui'
  import Vue from "vue"
  // import Viewer from "v-viewer"
  // Vue.use(Viewer)
  export default {
    name: "mvTemplate",
    data() {
      const positiveInt = /^[1-9]+[0-9]*]*$/ // 正整数
      // const versionRegex = /^\d+(\.\d+){0,2}$/ // 版本号
      const checkName = (rule, value, callback) => {
        let _this = this
        if (!value) {
          callback(new Error('请输入名称'));
        } else {
          if (value.length > 10) {
            let val = value.substring(0, 9)
            this.dialogForm.name = val
            callback(new Error('名称不能超过10个字'));
          } else {
            let model = {
              nameEqual: value,
              start: 0,
              count: 20,
              status: 0
            }
            this.$http.post({
              url: '/mv/getTemplateList',
              requestObj: model
            }).then(res => {
              // 先判断count
              if (res.count < 1) {
                callback()
              } else {
                if (_this.basicsEdit) { // 编辑状态中
                  if (res.count === 1) {
                    let list = res.list || []
                    if (list[0].tmpId === _this.nowTmpId) { // 获取的是本条记录
                      callback()
                    } else {
                      callback(new Error('名称重复'));
                    }
                  } else {
                    callback(new Error('名称重复'));
                  }
                } else {
                  callback(new Error('名称重复'));
                }
              }
            })
          }
        }
      }
      const checkTitle = (rule, value, callback) => {
        let _this = this
        if (!value) {
          callback(new Error('请输入名称'));
        } else {
          if (value.length > 10) {
            callback(new Error('名称不能超过10个字'));
          } else {
            let model = {
              titleEqual: value,
              start: 0,
              count: 20,
              status: 0
            }
            this.$http.post({
              url: '/mv/getTemplateList',
              requestObj: model
            }).then(res => {
              // 先判断count
              if (res.count < 1) {
                callback()
              } else {
                if (_this.isMaterialEdit) { // 编辑状态中
                  if (res.count === 1) {
                    let list = res.list || []
                    if (list[0].tmpId === _this.nowTmpId) { // 获取的是本条记录
                      callback()
                    } else {
                      callback(new Error('名称重复'));
                    }
                  } else {
                    callback(new Error('名称重复'));
                  }
                } else {
                  callback(new Error('名称重复'));
                }
              }
            })
          }
        }
      }
      const checkMinNumber = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入最少照片数量"))
        } else {
          if (value && !positiveInt.test(value)) {
            callback(new Error('请输入正整数'));
          } else {
            if (this.dialogForm.maxFileCount) {
              this.$refs["dialogForm"].validateField("maxFileCount")
            }
            callback()
          }
        }
      }
      const checkMaxNumber = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入最多照片数量"))
        } else {
          if (value && !positiveInt.test(value)) {
            callback(new Error('请输入正整数'));
          } else if (this.dialogForm.minFileCount && Number(this.dialogForm.minFileCount) > Number(value)) {
            callback(new Error('最多照片数量应不少于最少照片数量'));
          } else {
            callback()
          }
        }
      }
      const needMP3 = (rule, value, callback) => {
        if (this.mp3FileList.length === 0) {
          callback(new Error("请上传mp3文件"))
        } else {
          callback()
        }
      }
      const needZip = (rule, value, callback) => {
        if (this.dialogForm.resources.length === 0) {
          callback(new Error("请上传mp3文件"))
        } else {
          callback()
        }
      }
      const uniqueVersion = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入版本号"))
        } else {
          if (!positiveInt.test(value)) {
            callback(new Error("请输入正整数"))
          }
          let versionList = this.dialogForm.resources
          if (versionList && versionList.length > 0) {
            let flag = 0
            for (let i = 0, len = versionList.length; i < len; i++) {
              if (versionList[i] && versionList[i].version && versionList[i].version === value) {
                flag++;
              }
            }
            if (flag > 1) {
              callback(new Error("版本号重复"))
            } else {
              callback()
            }
          } else {
            callback()
          }
        }
      }
      const maxLength = (rule, value, callback) => {
        if (!value) {
          callback(new Error("不能为空"))
        } else {
          if (value.length > 14) {
            callback(new Error("不能超过14个字"))
          } else {
            callback()
          }
        }
      }
      const twenty = 20
      return {
        nine: 9,
        three: 3,
        apiContext: this.$http.apiContext,
        maxLength: maxLength,
        checkMinNumber: checkMinNumber,
        checkMaxNumber: checkMaxNumber,
        needMP3: needMP3,
        needZip: needZip,
        checkName: checkName,
        checkTitle: checkTitle,
        uniqueVersion: uniqueVersion,
        searchFromLabelWidth: "100px",
        labelWidth: "168px",
        searchFormModel: {
          id: "",
          name: "",
          status: "0",
          timeRange: [],
          startTime: null,
          endTime: null,
          start: 0,
          count: twenty
        },
        searchFormRules: {
          id: [{
            validator: checkName, trigger: 'change'
          }]
        },
        pickerOptions: {},
        // 表格相关
        tableData: [],
        tableConfig: {
          gridHeight: null
        },
        fileList: [],
        imgAttachOne: "img-attach-progress-one",
        imgAttachTwo: "img-attach-progress-two",
        // 分页相关
        currentPage: 1,
        pageSize: twenty,
        total: 0,
        // 基本信息对话框
        uploadUrl: this.$http.uploadUrl,
        dialogTitle: "新增滤镜",
        dialogVisible: false,
        dialogForm: {
          name: null,
          minFileCount: null,
          maxFileCount: null,
          iosTextClipListJson: null,
          androidTextClipListJson: null,
          resources: [{
            rid: null,
            tmpId: null,
            templateUrl: null,
            version: null,
            status: 0,
            name: null,  // 需删除的属性
            old: true //  需上传的属性 判断该文件是已上传的还是新添加进来的 上传时只上传 新添加的
          }] // 模板资源 存储对象 要拼接到 basics
        },
        // musicUrl: [], // 背景音乐 存储string - url 要拼接到 basics
        mp3FileList: [],
        basicsEdit: false,
        // 素材弹框相关
        right: "right",
        lw: "120px",
        materialDialogVisible: false,
        materialForm: {
          title: null,
          thumb: null,
          thumbSrc: null,
          style: 0,
          loadingPicture: null,
          loadingPictureSrc: null,
          loadingText: null,
          producingPicture: null,
          producingPictureSrc: null,
          producingText: null
        },
        materialFormRules: {

        },
        nowTmpId: null,
        isMaterialEdit: true,
        thumbnailData: { // 封面图限制
          width: 495,
          height: 495,
          maxSize: 50 * 1024
        },
        pictureData: { // 封面图限制
          width: 132,
          height: 132,
          maxSize: 20 * 1024
        }
      }
    },
    mounted() {
      this.getTableList()
      // qbbUtil.setGridHeight(this.tableConfig)
    },
    methods: {
      // 辅助函数
      imgSrcFilter(value) {
        if (!value) return '';
        return qbbUtil.getImgSrc(value)
      },
      getUrl(url, num) {
        let reg = /^http/i
        if (url && reg.test(url)) {
          if (url && url.length > num) {
            let arr = url.split("/")
            let len = arr.length
            if (len > num) {
              return arr[len - 2] + "/" + arr[len - 1]
            } else {
              throw new Error("num is over range")
            }
          }
        } else {
          return url;
        }
      },
      handleSearchFormModel(page = 1) { // page 页面 pageSize 一页展示多少条记录
        let form = Object.assign({}, this.searchFormModel); // 深拷贝
        // if (form.timeRange && form.timeRange.length > 0) { // 处理时间日期选择器
        //   let timeRange = form.timeRange;
        //   form.startTime = timeRange[0] || "";
        //   form.endTime = timeRange[1] || "";
        // }
        delete form.timeRange
        delete form.startTime
        delete form.endTime
        form.start = (page - 1) * this.pageSize
        return form;
      },
      // 搜索
      onSearch() {
        // this.handleCurrentChange(1, true) // 1 = page true = 滚回顶部
        console.log("currentPage = ", this.currentPage)
        // 防止 在第二页点搜索的时候 调回第一页但是发了两次请求
        if (this.currentPage !== 1) {
          this.currentPage = 1
        } else {
          this.getTableList(true)
        }
      },
      getTableList(scroll = false, page = 1) {
        let form = this.handleSearchFormModel(page);
        this.$http.get("http://localhost:4000/template/getMVTemplate",{}).then(res => {
          console.log("res = ", res)
          let data = res.data
          if(data) {
            this.tableData = data.list
            this.count = data.list.length
          } else {
              this.$message({
                type: 'error',
                message: '获取数据失败!',
                duration: 1000
              });
          }
        }) 
      },
      handleCurrentChange(page) {
        console.log('in')
        console.log('page = ', page)
        // this.page.currentPage = page
        this.getTableList(true) // true 滚回顶部
      },
      onAdd() {
        this.basicsEdit = false
        this.dialogTitle = "新建模板"
        this.dialogVisible = true
        this.nowTmpId = null
        this.$nextTick(() => {
          this.$refs['dialogForm'].clearValidate()
        })
      },
      materialEdit(row) {
        this.nowTmpId = row.tmpId
        let material = row.material || {}

        this.materialDialogVisible = true

        this.materialForm.style = material.style || 0
        this.materialForm.title = material.title
        this.materialForm.thumb = qbbUtil.getFid(material.thumb)
        this.materialForm.thumbSrc = qbbUtil.getImgSrc(material.thumb)
        this.materialForm.loadingText = material.loadingText
        this.materialForm.producingText = material.producingText
        this.materialForm.loadingPicture = qbbUtil.getFid(material.loadingPicture)
        this.materialForm.loadingPictureSrc = qbbUtil.getImgSrc(material.loadingPicture)
        this.materialForm.producingPicture = qbbUtil.getFid(material.producingPicture)
        this.materialForm.producingPictureSrc = qbbUtil.getImgSrc(material.producingPicture)

        this.$nextTick(() => {
          this.$refs.thumb.clearFiles();
          this.$refs['materialForm'].clearValidate()
        })
      },
      templateEdit(row) {
        this.basicsEdit = true
        this.dialogTitle = "编辑模板"
        this.dialogVisible = true

        this.nowTmpId = row.tmpId

        let basic = Object.assign({}, row.basics) || {}
        // console.log("basic = ", basic)
        this.dialogForm = basic
        let source = this.dialogForm.resources
        if (source) {
          for (let i = 0, len = source.length; i < len; i++) {
            source[i].name = source[i].templateUrl
            source[i].old = true
          }
        } else {
          this.dialogForm.resources = [{
            rid: null,
            tmpId: null,
            templateUrl: null,
            version: null,
            status: 0,
            name: null,  // 需删除的属性
            old: false //  需上传的属性 判断该文件是已上传的还是新添加进来的 上传时只上传 新添加的
          }]
        }
        let _this = this

        this.mp3FileList = [];
        if (basic.musicUrl != null && basic.musicUrl.length > 0) {
          for (let i = 0, len = basic.musicUrl.length; i < len; i++) {
            let url = basic.musicUrl[i]
            let mp3Obj = {
              url: url,
              name: this.getUrl(url, 2)
            }
            _this.mp3FileList.push(mp3Obj)
          }
        }
        console.log("mp3FileList", this.mp3FileList)
        // this.musicUrl = basic.musicUrl
        this.$nextTick(() => {
          this.$refs['dialogForm'].clearValidate()
        })
      },
      templateDelete(tmpId) {
        this.$confirm('确定删除该模板，删除后不可恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let form = {
            tmpId: tmpId,
            status: 1
          }
          this.$http.post({
            url: '/mv/updateTemplateStatus',
            params: form
          }).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!',
              duration: 1000
            });
            this.onSearch(this.currentPage)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 1000
          });
        });
      },
      // 对话框相关
      handleDialogCancel() {
        let form = {
          name: null,
          minFileCount: null,
          maxFileCount: null,
          iosTextClipListJson: null,
          androidTextClipListJson: null,
          resources: [{
            rid: null,
            tmpId: null,
            templateUrl: null,
            version: null,
            name: null,  // 需删除的属性
            status: 0,
            old: false //  需上传的对象属性 判断该文件是已上传的还是新添加进来的 上传时只上传 新添加的
          }] // 模板资源 存储对象 要拼接到 basics
        }
        this.dialogForm = form
        this.mp3FileList = []
        this.$refs['dialogForm'].clearValidate() // 去掉验证
        this.dialogVisible = false
        this.onSearch(this.currentPage)
      },
      handleBasicsForm() {
        let basics = Object.assign({}, this.dialogForm)
        let form = {};
        basics.resources = null
        form.basics = basics
        form.tmpId = this.nowTmpId ? this.nowTmpId : null
        return form
      },
      handleDialogSure() {
        this.$refs['dialogForm'].validate((valid) => {
          if (valid) {
            let form = this.handleBasicsForm()
            // console.log("dialogForm = ", form)
            // let loadingDom = this.$refs.addMVDialog.$el || ""
            let loadingDom = document.querySelector("html") || ""
            let loadingInstance = loadingDom ? Loading.service({
              target: loadingDom
            }) : false
            this.$http.post({
              url: "/mv/addOrUpdateTemplate",
              requestObj: form
            }).then(res => {
              let tmpId = res.template.tmpId
              this.submitFile(tmpId, loadingInstance)
            })
          }
        })
      },
      // 移除mp3
      handleMp3Remove(file, fileList) {
        // console.log("file = ", file)
        // console.log("fileList = ", fileList)
        this.mp3FileList = fileList
        this.$refs["dialogForm"].validateField("mp3FileList")
        // console.log("mp3FileList = ", this.mp3FileList)
      },
      onMp3Change(file, fileList) {
        // console.log("file = ", file)
        console.log("fileList = ", fileList)
        this.mp3FileList = fileList
        this.$refs["dialogForm"].validateField("mp3FileList")
        // console.log("mp3FileList = ", this.mp3FileList)
      },
      getResource(event, index) {
        let file = event.target.files[0];
        let name = file.name

        let resource = this.dialogForm.resources
        let resources = [...resource]
        resources[index].name = name
        resources[index].old = false
        this.dialogForm.resources = []  // 属性在对象中太深了 Vue的观察者可能观察不到 因此没有达到数据驱动的效果 ，所以先清空
        this.dialogForm.resources = resources
        //
        // this.dialogForm.resources[index].name = name // mvUtils.getFileName(name)
        // this.dialogForm.resources[index].old = false
        this.$refs["dialogForm"].validateField("resources." + index + ".name")
        // console.log("resources", this.dialogForm.resources)
      },
      // 上传MP3资源和 zip包
      submitFile(tmpId, loadingInstance) {
        let formData = new FormData()
        formData.append("tmpId", tmpId)
        // 添加zip

        let zipList = document.querySelectorAll('.file-btn')
        let dialogForm = Object.assign({}, this.dialogForm)
        let versionList = dialogForm.resources
        console.log("zipList = ", zipList)
        console.log("versionList = ", versionList)
        let oldResources = []
        // for (let i = 0, len = zipList.length; i < len; i++) {
        //   if (zipList[i] && zipList[i].files && versionList[i] && !versionList[i].old) {
        //     formData.append("zip", zipList[i].files[0])
        //     formData.append("version", versionList[i].version) // 新的资源的version
        //   } else if (versionList[i].old) {
        //     delete versionList[i].name
        //     delete versionList[i].old
        //     oldResources.push(versionList[i]) // 老资源的version
        //   }
        // }
        for (let i = 0, len = zipList.length; i < len; i++) {
          if (zipList[i] && zipList[i].files) {
            formData.append("zip", zipList[i].files[0])
          }
        }
        for (let i = 0, len = versionList.length; i < len; i++) {
          if (versionList[i] && !versionList[i].old) {
            formData.append("version", versionList[i].version) // 新的资源的version
          } else if (versionList[i] && versionList[i].old) {
            delete versionList[i].name
            delete versionList[i].old
            oldResources.push(versionList[i]) // 老资源的version
          }
        }
        if (oldResources.length > 0) {
          let obj = {
            oldResources: oldResources
          }
          formData.append("oldResources", JSON.stringify(obj))
        }
        // 添加MP3
        let mp3FileList = this.mp3FileList
        let oldMP3Arr = []  // 上传已上传的文件
        for (let i = 0, len = mp3FileList.length; i < len; i++) {
          // 新添加的MP3文件
          if (mp3FileList[i].raw) {
            formData.append("mp3", mp3FileList[i].raw)
          } else { // 上传已上传的文件
            oldMP3Arr.push(this.getUrl(mp3FileList[i].url, 2))
          }
        }
        if (oldMP3Arr.length > 0) {
          formData.append("oldMusic", oldMP3Arr.join(","))
        }
        let iosTextClipListJson = this.dialogForm.iosTextClipListJson
        let androidTextClipListJson = this.dialogForm.androidTextClipListJson
        if (iosTextClipListJson) {
          formData.append("iosTextClipListJson", iosTextClipListJson)
        }
        if (androidTextClipListJson) {
          formData.append("androidTextClipListJson", androidTextClipListJson)
        }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

        this.$httpOne.post(this.apiContext + "/mv/uploadBasic", formData, config).then(res => {
          // console.log("res = ", res)
          if (res && res.data && res.data.rc === 0) {
            this.$message({
              type: 'success',
              message: "操作成功",
              duration: 1000
            });
            this.handleDialogCancel()
          } else {
            this.$message({
              type: 'error',
              message: res.errorInfo || "上传出错",
              duration: 1500
            });
          }
          loadingInstance && loadingInstance.close()
          this.onSearch(this.currentPage)
        }).catch(error => {
          console.error(error)
          loadingInstance && loadingInstance.close()
        })
        // this.$refs.upload.submit();
      },
      // 删除文件和version
      deleteResource(index) {
        // this.dialogForm.resources.splice(index, 1)
        if (this.dialogForm.resources[index].old) {
          // 老文件 才需要置删除
          this.dialogForm.resources[index].status = 1
        } else {
          this.dialogForm.resources.splice(index, 1)
        }
      },
      // 添加压缩包和版本号
      addResource (index) {
        let tempResource = {
          rid: null,
          tmpId: null,
          templateUrl: null,
          version: null,
          name: null,
          status: 0,
          old: false
        }
        this.dialogForm.resources.push(tempResource)
      },
      // 只删除文件
      deleteResourceFile(index) {
        document.querySelectorAll('.file-btn')[index].value = null
        let resources = JSON.parse(JSON.stringify(this.dialogForm.resources))
        resources[index].name = null
        resources[index].templateUrl = null
        this.dialogForm.resources = []  // 属性在对象中太深了 Vue的观察者可能观察不到 因此没有达到数据驱动的效果 ，所以先清空
        this.dialogForm.resources = resources
        // console.log("resources = ", this.dialogForm.resources)
        this.$refs["dialogForm"].validateField("resources." + index + ".name")
      },
      // 素材对话框相关
      handleMaterialForm() {
        let material = Object.assign({}, this.materialForm)
        delete material.thumbSrc
        delete material.loadingPictureSrc
        delete material.producingPictureSrc
        let form = {
          tmpId: this.nowTmpId,
          material: material
        }
        return form
      },
      materialDialogCancel() {
        let materialForm = {
          title: null,
          thumb: null,
          thumbSrc: null,
          style: 0,
          loadingPicture: null,
          loadingPictureSrc: null,
          loadingText: null,
          producingPicture: null,
          producingPictureSrc: null,
          producingText: null
        }
        this.materialForm = materialForm
        this.materialDialogVisible = false
      },
      materialDialogSure() {
        this.$refs['materialForm'].validate((valid) => {
          if (valid) {
            let form = this.handleMaterialForm()
            this.$http.post({
              url: "/mv/addOrUpdateTemplate",
              requestObj: form,
              loadingDom: document.querySelector("html") || "" // this.$refs.materialDialog.$el || ""
            }).then(res => {
              this.$message({
                type: 'success',
                message: "素材编辑成功",
                duration: 1500
              });
              this.materialDialogCancel()
              this.onSearch(this.currentPage)
            })
          }
        })
      },
      // 封面图
      beforeUploadThumb(file) {
        const isJPG = file.type === 'image/jpeg';

        if (!isJPG) {
          this.$message.error('请选择 jpg 格式的图片!');
        }
        return isJPG;
      },
      onRemoveThumb(file, fileList) {
        this.materialForm.thumb = null
        this.materialForm.thumbSrc = null
      },
      onExceedThumb(file, fileList) {
        this.$message.error('一次只允许上传一张图片。');
      },
      successUploadThumb(response, files, fileList) {
        if (response && response.length && response[0].result === "0") {
          this.materialForm.thumb = response[0].fid
          this.materialForm.thumbSrc = response[0].original
        } else {
          let message = (response && response[0]) ? response[0].msg : "上传出错"
          this.$message({
            type: "error",
            message: message
          })
          this.$refs.thumb.clearFiles();
        }
        this.$refs["materialForm"].validateField("thumb")
      },
      changeStyle(value) {
        // console.log("value = ", value)
        if (value === 0) { // 默认   1 - 自定义
          this.materialForm.loadingPicture = null
          this.materialForm.loadingPictureSrc = null
          this.materialForm.loadingText = null
          this.materialForm.producingPicture = null
          this.materialForm.producingPictureSrc = null;
          this.materialForm.producingText = null
        }
      },
      // 加载图
      beforeUploadLoadingPicture(file) {
        const isPNG = file.type === 'image/png';

        if (!isPNG) {
          this.$message.error('请选择 png 格式的图片!');
        }
        return isPNG;
      },
      onRemoveLoadingPicture(file, fileList) {
        this.materialForm.loadingPicture = null
        this.materialForm.loadingPictureSrc = null
      },
      successUploadLoadingPicture(response, file, fileList) {
        if (response && response.length && response[0].result === "0") {
          this.materialForm.loadingPicture = response[0].fid
          this.materialForm.loadingPictureSrc = response[0].original
        } else {
          let message = (response && response[0]) ? response[0].msg : "上传出错"
          this.$message({
            type: "error",
            message: message
          })
          this.$refs.loadingPicture.clearFiles();
        }
        this.$refs["materialForm"].validateField("loadingPicture")
      },
      onExceedLoadingPicture(files, fileList) {
        this.$message.error('一次只允许上传一张缩略图。');
      },
      // 保存图
      beforeUploadProducingPicture(file) {
        const isPNG = file.type === 'image/png';

        if (!isPNG) {
          this.$message.error('请选择 png 格式的图片!');
        }
        return isPNG;
      },
      onRemoveProducingPicture(file, fileList) {
        this.materialForm.producingPicture = null
        this.materialForm.producingPictureSrc = null
      },
      successUploadProducingPicture(response, file, fileList) {
        if (response && response.length && response[0].result === "0") {
          this.materialForm.producingPicture = response[0].fid
          this.materialForm.producingPictureSrc = response[0].original
        } else {
          let message = (response && response[0]) ? response[0].msg : "上传出错"
          this.$message({
            type: "error",
            message: message
          })
          this.$refs.producingPicture.clearFiles();
        }
        this.$refs["materialForm"].validateField("producingPicture")
      },
      onExceedProducingPicture(files, fileList) {
        this.$message.error('一次只允许上传一张缩略图。');
      }
    }
  }
</script>

<style lang="scss" scoped>
  $PhotoWidth: 180px;
  $PhotoHeight: 180px;
  @mixin Photo($W: $PhotoWidth, $H: $PhotoHeight, $Scale: 1, $LH:false) {
    @if $LH{
      line-height: $LH * $Scale;
    }
    width: $W * $Scale;
    height: $H * $Scale;
  }

  .block {
    float: right;
  }
  .input-dialog{
    width: 270px;
  }
  .input-big-dialog {
    width: 300px;
  }
  .input-small-dialog {
    width: 120px;
  }
  .version-link {
    display: inline-block;
    margin-left: 10px;
  }

  .title-info {
    color: #8e7d7d;
    margin-left: 6px;
    font-size: 12px;
  }
  .from-inline-item .el-form-item__content {
    margin-left: 0px;
  }

  %img-attach-progress {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 30%;
  }

  .pageShow {
    padding: 4px;
    .img-attach-progress-one { // 表格内有缩略图
      @extend %img-attach-progress;
      top: 9px;
    }
    .img-attach-progress-two { // 表格无缩略图
      @extend %img-attach-progress;
      top: -1px;
    }
  }

  .photo {
    display: block;
    margin: 0 auto;
    @include Photo($PhotoWidth, $PhotoHeight, 0.5, $PhotoHeight);
  }

  .upload-demo /deep/ .el-upload-dragger {
    width: 240px;
    height: 120px;
  }
  .upload-demo /deep/ .el-icon-upload {
    margin: 20px 0 16px;
  }

  // input file 样式
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
    padding: 2px 12px;
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

  // 资源边框容器样式
  .border-container {
    margin-bottom: 8px;
    margin-top: 8px;
    width: 500px;
    height: 114px;
    border-style: solid;
    border-width: 1px;
    padding: 10px 10px;
    border-color: whitesmoke;
  }
  // 加减button
  .button__addOrDel0 {
    position: absolute;right: 0px;bottom: 16px;
  }
  .button__addOrDel60 {
    position: absolute;right: 60px;bottom: 16px;
  }
  .resources-item {
    display: inline-block;

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

  }
  .icon-upload-delete {
    color: #f56c6c;
    cursor: pointer;
    margin-left: 10px;
  }

  /* 素材编辑框相关 */

  /* 封面图 */
  $CoverWidth: 495px;
  $CoverHeight: 495px;

  .cover-photo-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .cover-photo-uploader /deep/ .el-upload:hover {
    border-color: #409eff;
  }
  .cover-photo-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    @include Photo($CoverWidth, $CoverWidth, 0.2, $CoverHeight);
    text-align: center;
  }
  .cover-photo {
    display: block;
    margin: 0 auto;
    @include Photo($CoverWidth, $CoverWidth, 0.2, $CoverHeight);
  }


  $PageWidth: 132px;
  $PageHeight: 132px;

  .page-photo-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .page-photo-uploader /deep/ .el-upload:hover {
    border-color: #409eff;
  }
  .page-photo-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    @include Photo($PageWidth, $PageHeight, 0.5, $PageHeight);
    text-align: center;
  }
  .page-photo {
    display: block;
    margin: 0 auto;
    @include Photo($PageWidth, $PageHeight, 0.5, $PageHeight);
  }
  .ml10 {
    margin-left: 10px;
  }
  .popover-button-group {
    text-align: right; margin: 0
  }
  .popover-item {
    display: block;
    margin: 4px;
  }
</style>

