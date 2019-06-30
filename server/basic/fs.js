const fs = require("fs");
// 异步读取
fs.readFile("./input.txt", function(err, data) {
  if (err) {
    return console.error(err);
  }
  console.log("异步读取: " + data);
});

console.log("程序执行中");

let d = fs.readFileSync("./input_1.txt");
console.log("同步读取: " + d);

const path = "./input.txt";
const flags = "r+";
const mode = null;
const file = "./input.txt";
const data = "I am zty!";
const options = null;
const buffer = new Buffer.alloc(4);
const offset = 0;
const length = 10;
const position = null;
const callback = (error, obj) => {
  console.log("error = ", error);
  console.log("obj = ", obj);
};

/** 异步模式下打开文件
 * path - 文件的路径。
 * flags - 文件打开的行为。具体值详见下文。
 * mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
 * callback - 回调函数，带有两个参数如：callback(err, fd)。
 */
let fd = fs.open(path, flags, mode, callback);

/** 异步模式获取文件信息
 * path - 文件路径。
 * callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。
 */
fs.stat(path, callback);

/** 异步模式下写入文件
 * file - 文件名或文件描述符。
 * data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(缓冲) 对象。
 * options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
 * callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。
 */
fs.writeFile(file, data, options, callback);

/** 异步模式下读取文件
 * fd - 通过 fs.open() 方法返回的文件描述符。
 * buffer - 数据写入的缓冲区。
 * offset - 缓冲区写入的写入偏移量。
 * length - 要从文件中读取的字节数。
 * position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
 * callback - 回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。
 */
fs.read(fd, buffer, offset, length, position, callback);

/** 异步模式下关闭文件
 * fd - 通过 fs.open() 方法返回的文件描述符。
 * callback - 回调函数，没有参数。
 */
fs.close(fd, callback);

/** 异步模式下截取文件
 * fd - 通过 fs.open() 方法返回的文件描述符。
 * length - 文件内容截取的长度。
 * callback - 回调函数，没有参数。
 */
fs.ftruncate(fd, length, callback);

/** 删除文件
 * path - 文件路径。
 * callback - 回调函数，没有参数。
 */
fs.unlink(path, callback);

/**
 * 创建目录
 * path - 文件路径。
 * options 参数可以是：
  recursive - 是否以递归的方式创建目录，默认为 false。
  mode - 设置目录权限，默认为 0777。
 * callback - 回调函数，没有参数。
 */
fs.mkdir(path, options, callback);

/** 读取目录
 * path - 文件路径。
 * callback - 回调函数，回调函数带有两个参数err, files，err 为错误信息，files 为 目录下的文件数组列表。
 */
fs.readdir(path, callback);

/** 删除目录
 * path - 文件路径。
 * callback - 回调函数，没有参数。
 */
fs.rmdir(path, callback);

// ... 等等
