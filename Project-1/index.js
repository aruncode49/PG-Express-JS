const express = require("express");

const { connectMongoDB } = require("./connection");
const { logReqRes } = require("./middlewares/index");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

// Connection
connectMongoDB("mongodb://127.0.0.1:27017/express-app");

// Middleware -> Plugin
app.use(express.urlencoded({ extended: true })); // bodyParser -> change to express

// Create Custom Middleware
app.use(logReqRes("log.txt"));

// ROUTES
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`);
});
