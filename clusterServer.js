const express = require("express");
const cluster = require("cluster");
const os = require("os");

const totalCpus = os.cpus().length;

if (cluster.isPrimary) {
  // divide the work load
  // Fork workers.
  for (let i = 0; i < totalCpus; i++) {
    cluster.fork();
  }
} else {
  // otherwise make simple express app
  const app = express();
  const PORT = 3000;

  app.get("/", (req, res) => {
    res.json({
      message: `Hello from express server ${process.pid}`,
    });
  });

  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}
