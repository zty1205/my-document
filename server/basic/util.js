// node内置工具类
const util = require("util");

// 继承
function Par() {
  this.name = "base";
  this.sayHello = function() {
    console.log("Hello " + this.name);
  };
}
Par.prototype.showName = function() {
  console.log("name = ", this.name);
};

function Child() {
  this.name = "child";
  this.age = 11;
}

util.inherits(Child, Par);

let p = new Par();
let c = new Child();
console.log("p = ", p);
// console.log("c= ", c);
c.showName();

console.log(util.inspect(c, true, 2, true));
console.log("is Array = ", util.isArray([]));
console.log("is date = ", util.isDate(Date.now()));
