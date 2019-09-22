const express = require('express')
const router = express.Router()

const path = require('path'); //系统路径模块
const fs = require('fs'); //文件模块

const ResultCode = require("../class/ResultCode")
const CommonResult = require ("../class/CommonResult")

const LOCAL_PATH = 'public/localStorage/img/'
const multer = require("multer")
const upload = multer({ dest: LOCAL_PATH });

// console.log("ResultCode = ", ResultCode)
// console.log("CommonResult = ", CommonResult)

router.get('/getMVTemplate', (req, res, next) => {
    const file = path.join(__dirname, 'mvTemplate.json'); //文件路径，__dirname 为当前运行js文件的目录
    //const file = 'f:\\nodejs\\data\\test.json'; //也可以用这种方式指定路径
    // console.log("file = ", file)

    //读取json文件
    fs.readFile(file, 'utf-8', function(err, data) {
        let commonResult = new CommonResult()
        if (err) {
            commonResult.setResult(ResultCode.FILE_NOT_FIND)
            commonResult.setErrorInfo("文件读取失败")
            // res.send('文件读取失败');
        } else {
            let _data;
            try {
                _data = JSON.parse(data) // json 文件读出的是string
            } catch(error) {
                throw new Error(error)
            }
            
            commonResult.setList(_data.list);
            commonResult.setResult(ResultCode.RESULT_OK);
            commonResult.setMessageInfo("成功读取json文件")
            // console.log("data = ", data)
            // console.log("type of", typeof data)
            // console.log("parse", JSON.parse(data))
            // console.log("data list = ", data.list)
            // console.log("data list2 ", data["list"] )
            // res.send(data);
        }
        // console.log("commonResult = ", commonResult.getClass())
        // res.json(commonResult)
        res.json(commonResult.getClass())
    });
})

router.get('/img', (req, res, next) => {
    res.send("hello")
})

router.post('/postImg', upload.single("img"), (req, res, next) => {
    // 不做任何操作 直接接受会在文件下生成一个二进制文件

    // 简单的做重命名
    let file = req.file
    let name = file.originalname
    let newName = new Date().getTime() + "_" + name
    let new_path = LOCAL_PATH + newName
    fs.renameSync(LOCAL_PATH + file.filename, new_path);
    let pathList = new_path.split("/")
    pathList.shift()
    let path = pathList.join("/")
    let result = {
        rc: 0,
        original: path,
        msg: "上传成功"
    }
    // 前端可以使用FileReader显示图片或使用服务器返回的地址
    res.json(result)
})

router.post('/test', (req, res, next) => {
    console.log("body = ", req.body)
    console.log("query = ", req.query)
})
module.exports = router