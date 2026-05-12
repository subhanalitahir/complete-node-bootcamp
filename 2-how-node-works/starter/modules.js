// console.log(arguments);
// console.log(require("module").wrapper);
const C = require("./test-module-1");
const calculator = new C();
console.log(calculator.add(5, 8));
