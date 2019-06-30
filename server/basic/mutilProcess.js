const child_process = require("child_process");

// exec、execFile、spawn和fork执行的子进程都是默认异步的，子进程的运行不会阻塞主进程。除此之外，child_process模块同样也提供了execFileSync、spawnSync和execSync来实现同步的方式执行子进程。

// 异步 spawn
/*
var cp = child_process.spawn("node", [__dirname + "/helloWorld.js"]);
cp.stdout.on("data", function(data) {
  console.log("stdout: " + data);
});
cp.on("close", function(code) {
  console.log("子进程已退出，退出码 " + code);
});
console.log("进程 " + process.argv[1] + "执行");
*/

let c = child_process.fork("./childProcess1.js");
c.on("message", function(m) {
  console.log("Parent got message:", m);
});
c.send({ msg: "Parent send" });

setTimeout(() => {
  c.kill();
  process.exit(0);
  c.stdout.on("close", (code, signal) => {
    console.log(`子进程收到信号 ${signal} ${code}而终止`);
  });
}, 2000);
