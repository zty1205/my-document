const http = require("http");
const url = require("url");
const querystring = require("querystring");

// GET
// http
//   .createServer(function(req, res) {
//     res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
//     // 解析 url 参数
//     var params = url.parse(req.url, true).query;
//     res.write("网站名：" + params.name);
//     res.write("\n");
//     res.write("网站 URL：" + params.url);
//     res.end();
//   })
//   .listen(3000);

// POST

var postHTML =
  '<html><head><meta charset="utf-8"><title> Node.js POST 实例</title></head>' +
  "<body>" +
  '<form method="post">' +
  '名称： <input name="name"><br>' +
  '年龄： <input name="age"><br>' +
  '<input type="submit">' +
  "</form>" +
  "</body></html>";

http
  .createServer(function(req, res) {
    var body = "";
    req.on("data", function(chunk) {
      body += chunk;
    });
    req.on("end", function() {
      // 解析参数
      body = querystring.parse(body);
      // 设置响应头部信息及编码
      res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });

      if (body.name && body.age) {
        // 输出提交的数据
        res.write("姓名：" + body.name);
        res.write("<br>");
        res.write("年龄：" + body.age);
      } else {
        // 输出表单
        res.write(postHTML);
      }
      res.end();
    });
  })
  .listen(3000);
