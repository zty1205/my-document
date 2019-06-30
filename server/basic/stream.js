// 读出流
const fs = require("fs");
const zlib = require("zlib");
let data = "";
/*
// 创建可读流
let readerStream = fs.createReadStream("./helloWorld.js");

// 设置编码为 utf8。
readerStream.setEncoding("UTF8");

// 处理流事件 --> data, end, and error
readerStream.on("data", function(chunk) {
  console.log("on");
  data += chunk;
});

readerStream.on("end", function() {
  console.log("end data = ", data);
});

readerStream.on("error", function(err) {
  console.log("error = ", err.stack);
});

// 写入流
// 创建一个可以写入的流，写入到文件，没有则新建
let writerStream = fs.createWriteStream("./output.txt");

// 使用 utf8 编码写入数据
writerStream.write("my name is zty!", "UTF8");

// 标记文件末尾
writerStream.end();

// 处理流事件 --> data, end, and error
writerStream.on("finish", function() {
  console.log("写入完成");
});

writerStream.on("error", function(err) {
  console.log(err.stack);
});


// 管道流
// 创建一个可读流
let rs = fs.createReadStream("./input.txt");
// 创建一个可写流
let ws = fs.createWriteStream("./output.txt");

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
// 会将output里的所有内容都覆盖
rs.pipe(ws);

// 链式流
// 连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。管道和链式来压缩和解压文件。
fs.createReadStream("./input.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("./input.txt.gz"));
*/

// 解压 input.txt.gz 文件为 input.txt
// 异步操作，同时压缩和解压，会造成解压报错
fs.createReadStream("./input.txt.gz")
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream("./input_1.txt"));
