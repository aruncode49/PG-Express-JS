const mongoose = require("mongoose");

const connectMongoDB = async (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("ERROR: ", err));
};

// Export this connectMongoDB function
module.exports = {
  connectMongoDB,
};
