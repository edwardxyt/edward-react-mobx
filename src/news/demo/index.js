require("./a.js");
require("./b.js");
const edward = {
  edward: "xiayuting"
};
console.log("我是index.js", { a: 10, ...edward });
console.log(__ENV__, __DEBUG__, __PROJECT__);
