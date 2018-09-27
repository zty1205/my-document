
"use strict"

var CommonResult = (function() {

    // 返回一个构造函数
    return function() {
        // 定义私有的非静态变量
        var _result;
        var _messageInfo;
        var _errorInfo;
        var _list;

        // 定义 特权方法 共有的非静态方法
        this.setResult = function(value) {
            _result = value;
        }
        this.getResult = function() {
            return _result;
        }
        this.setMessageInfo = function(value) {
            _messageInfo = value;
        }
        this.getMessageInfo = function(value) {
            return _messageInfo;
        }
        this.setErrorInfo = function(value) {
            _errorInfo = value;
        }
        this.getErrorInfo = function() {
            return _errorInfo;
        }
        this.setList = function(value) {
            _list = value;
        }
        this.getList = function() {
            return _list;
        }
        this.getClass = function() {
            let obj = Object.assign({}, {
                result: _result,
                messageInfo: _messageInfo,
                errorInfo: _errorInfo,
                list: _list
            })
            return obj
        }
        // _result = null;
        // _messageInfo = null;
        // _errorInfo = null;
        // _list = null; 
    }
})()


// const CommonResult = (function () {
//     let _result = Symbol("_result");
//     let _messageInfo = Symbol("_messageInfo");
//     let _errorInfo = Symbol("_errorInfo");
//     let _list = Symbol("_list");
//     class CommonResult {
//         constructor() {
//             _result = null;
//             _messageInfo = null;
//             _errorInfo = null;
//             _list = null; 
//         }
//         getResult() {
//             return _result;
//         }
    
//         setResult(value) {
//             _result = value;
//         }
    
//         getMessageInfo() {
//             return _messageInfo;
//         }
    
//         setMessageInfo(value) {
//             _messageInfo = value;
//         }
    
//         getErrorInfo() {
//             return _errorInfo;
//         }
    
//         setErrorInfo(value) {
//             _errorInfo = value;
//         }

//         getList() {
//             return _list;
//         }

//         setList(value) {
//             _list = value
//         }
//     }
//     return CommonResult
// })()
   
module.exports = CommonResult