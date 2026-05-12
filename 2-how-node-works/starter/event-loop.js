const fs = require("fs");
const start = Date.now();
const crypto = require("crypto");
process.env.UV_THREADPOOL_SIZE = 1;
setTimeout(() => {
  console.log("Finished the timeout function");
}, 0);
setImmediate(() => {
  console.log("Finished Immideate Function");
});
fs.readFile(`${__dirname}/test-file.txt`, () => {
  console.log("I/O operations finished.");
  console.log("----------------------------------");
  setTimeout(() => {
    console.log("Finished the timeout 2 function");
  }, 0);
  setTimeout(() => {
    console.log("Finished the timeout 2 function");
  }, 3000);
  setImmediate(() => {
    console.log("Finished Immideate 2 Function");
  });
  process.nextTick(() => {
    console.log("nextTick function finished.");
  });
  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password has been Encrypted.");
  });
  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password has been Encrypted.");
  });
  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password has been Encrypted.");
  });
  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password has been Encrypted.");
  });
});
