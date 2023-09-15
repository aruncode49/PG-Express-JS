const express = require("express");
const status = require("express-status-monitor");
const zlib = require("zlib");
const fs = require("fs");

const app = express();
const PORT = 3000;

// express memory usage
app.use(status());

// Not a prefferable method to read a big file
// app.get("/", (req, res) => {
//   fs.readFile("./bigData.txt", (err, data) => {
//     res.write(data);
//     res.end();
//   });
// });

// create a zip file from this big file
fs.createReadStream("./bigData.txt").pipe(
  zlib.createGzip().pipe(fs.createWriteStream("./bigData.zip"))
);

// we are using streams
app.get("/", (req, res) => {
  const file = fs.createReadStream("./bigData.txt", "utf-8");
  file.on("data", (chunks) => {
    res.send(chunks);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
