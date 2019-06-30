// 全局对象
/**
 * __filename 表示当前正在执行的脚本的文件名
 * __dirname 表示当前执行脚本所在的目录
 * setTimeout(cb, ms)
 * clearTimeout(t)
 * setInterval(cb, ms)
 * console
 */

// console.log("__filename = ", __filename);
// console.log("__dirname = ", __dirname);

// exit 当进程准备退出时触发。
// process.on("exit", function(code) {
//   // 以下代码永远不会执行
//   setTimeout(function() {
//     console.log("该代码不会执行");
//   }, 0);

//   console.log("退出码为:", code);
// });

// process
// 输出到终端
process.stdout.write("Hello World!" + "\n");

// 通过参数读取
process.argv.forEach(function(val, index, array) {
  console.log("array = ", array);
  console.log(index + ": " + val);
});

// 获取执行路径
console.log(process.execPath);

// 平台信息
console.log(process.platform);
