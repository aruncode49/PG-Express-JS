const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// ROUTES
app.get("/", (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`);
});
