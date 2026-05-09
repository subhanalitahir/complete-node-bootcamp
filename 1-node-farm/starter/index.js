const fs = require("fs");
const file =fs.readFileSync("./txt/input.txt","utf-8");
const text = `The content of the file is: ${file}\nIt was created on ${Date.now()}`
fs.writeFileSync("./txt/output.txt",text);
console.log("File Created.");
