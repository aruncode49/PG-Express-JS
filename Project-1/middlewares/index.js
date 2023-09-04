const fs = require("fs");

const logReqRes = (fileName) => {
  return (req, res, next) => {
    const log = `\n${Date.now()} : ${req.method} : ${
      req.path
    } : New Request Recived`;
    fs.appendFile(fileName, log, (err) => {
      next();
    });
  };
};

module.exports = {
  logReqRes,
};
