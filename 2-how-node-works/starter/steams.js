const fs = require("fs");
const http = require("http").createServer();
http.on("request", (req, res) => {
  //   fs.readFile("./test-file.txt", "utf-8", (err, data) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.end(data);
  //     }
  //   });

  // Solution with streams
  //   const readable = fs.createReadStream("./test-file.txt");
  //   readable.on("data", (chunk) => {
  //     // By using this the writing of response is not so fast as it is reciving the things. This is called back pressure.
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", () => {
  //     res.statusCode = 500;
  //     res.end("File not Found!");
  //   });

  // Final Solution with pipe()
  const readableSource = fs.createReadStream("./test-file.txt");
  readableSource.pipe(res);
});
http.listen(8000, "127.0.0.1", () => {
  console.log("Listening....");
});
