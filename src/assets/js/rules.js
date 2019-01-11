/**
 * 验证器
 * @param {*} rule  rule 组件里定义的rule对象 例： { validator: max, max: 10, message: '最大值为10', trigger: 'blur change' }
 * @param {*} value 表单的输入值
 * @param {*} callback 回调 必须回调
 */

 // element-ui 提供了 required: true, type: "date | array | number | ..."  min : 2, max: 5 长度2-5个字符

function maxNumber(rule, value, callback) {
    let max = rule.maxNumber || 99
    if (value && Number(value) > max) {
      callback(new Error('最大值不能超过' + rule.maxNumber))
    }
    callback()
  }
  
function minNumber(rule, value, callback) {
    let min = rule.minNumber || 0
    if (value && value < min) {
        callback(new Error('最小值不能小于' + min))
    }
    callback()
}