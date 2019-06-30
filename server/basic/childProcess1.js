// mutilProcess 会新建一个子进程调用该函数
process.on("message", function(m) {
  console.log("Child Process got message:", m);
});
process.send({ msg: "Child Send" });
