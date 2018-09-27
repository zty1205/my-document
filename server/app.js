const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const env = process.env.NODE_ENV || 'development'

app.use(bodyParser.json())
const templateRoutes = require('./api/template')

//设置允许跨域请求
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //访问控制允许来源：所有
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); //访问控制允许方法
    res.header('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World');
})
app.use('/template', templateRoutes)

// 错误处理 中间件
app.use((err, req, res, next) => {
    res.status(442).send({ error: err.message })
})

// 使用内置中间件 将`webpack`打包后的`dist`作为静态资源
if (env !== 'development') {
    app.use(express.static('./statics'))
}

// 监听4000端口
const server = app.listen(4000, () => {
    console.log(`Express started in ${app.get('env')} mode on http://localhost:4000`)
})