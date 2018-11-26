<template>
    <div class="son">
        <div class="formBody qbbMoney-toEmail">
            <el-dialog title="邮件导出" :visible="toEmailVisible" :before-close="close" width="450px" class="g-edit-dialog g-scroll-dialog">
                
                <slot name="timer"></slot>
                
                <el-form label-position="left" label-width="100px" :model="emailFormModel" :inline="true" :rules="emailFormRules" class="form-inline" ref="emailForm">
                    <el-row style="margin-top: 25px;">
                    <el-col :span="19">
                        <el-form-item label="邮箱地址" class="inline-input" prop="email">
                        <el-input type="text" auto-complete="off" v-model="emailFormModel.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        @qbb6.com
                    </el-col>
                    </el-row>
                    <el-row class="excel-info">
                    表格将以附件的形式稍后发送到邮箱，请注意查收!
                    </el-row>
                    <el-form-item label="test" style="margin-top:20pxl" label-width="140px">
                        <el-input v-model="emailFormModel.name"></el-input>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sendEmail">发 送</el-button>
                    <el-button @click="close">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
function isQbb6Email(rule, value, callback) {
  value = value ? value.replace(" ", "") + "@qbb6.com" : value;
  let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  let flag = reg.test(value);
  if (value && !flag) {
    callback(new Error("邮箱格式不正确"))
  }
  callback()
}
export default {
    name: "soltSon",
    props: {
        toEmailVisible: {
            type: Boolean
        }
    },
    data() {
        return {
            emailFormModel: {
                email: null
            },
            emailFormRules: {
                email: [
                    { required: true, trigger: "blur change", message: "不能为空" },
                    { validator: isQbb6Email, trigger: "blur change" }
                ]
            }
        }
    },
    methods: {
        close() {
            this.$emit("close");
            },
        sendEmail() {
            let isValid = true;
            console.log("form = ", this.emailFormModel)
            this.$refs.emailForm.validate(res => {
                isValid = isValid && res;
            });
            this.$nextTick(() => {
                let errorLen = document
                .querySelector(".qbbMoney-toEmail")
                .querySelectorAll(".el-form-item__error").length;
                if (errorLen === 0) {
                this.$emit("save", this.emailFormModel.email + "@qbb6.com");
                }
            });
        },
        clearForm() {
            this.$nextTick(() => {
                this.$refs.emailForm.resetFields();
            })
        }
    },
    mounted() {}
}
</script>

<style lang="scss" scoped>
 .qbbMoney-toEmail {
  /deep/ .el-dialog__body {
    padding: 15px 20px 40px 20px;
    .el-input {
      width: 214px !important;
    }
  }
}
  .excel-info {
    margin-left: 20px;
    margin-top: 10px;
    color: #909399;
  }
</style>
