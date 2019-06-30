// Buffer 缓冲区

/**
 * ascii - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
 * utf8 - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
 * utf16le - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
 * ucs2 - utf16le 的别名。
 * base64 - Base64 编码。
 * latin1 - 一种把 Buffer 编码成一字节编码的字符串的方式。
 * binary - latin1 的别名。
 * hex - 将每个字节编码为两个十六进制字符。
 */

let buf = Buffer.from("zty", "ascii");
console.log("buf = ", buf);
console.log("zty hex = ", buf.toString("hex"));
console.log("zty base64 = ", buf.toString("base64"));

console.clear();
// 申请
let b1 = Buffer.alloc(20); // 默认以0填充
// 写
b1.write("zty", "utf-8");
console.log("write b1 = ", b1);
console.log("length b1 = ", b1.length);
// 读
console.log("zty base64 = ", b1.toString("base64"));
console.log("zty json = ", b1.toJSON());
// 拷贝
let b2 = Buffer.from("");
b2.copy(b1);
console.log("copy b2 = ", b2);
// 剪切
b2.slice(0, 2);
console.log("slice b2 = ", b2);
// 合并
let b3 = Buffer.concat([b1, b2]);
console.log("concat b3 = ", b3);
// 比较 a.compare(b); <0 a在b之前; =0 a等于b; >0 a在b之后
console.log("compare b3 b1= ", b3.compare(b2));
console.log("compare b1 b1= ", b1.compare(b1));
