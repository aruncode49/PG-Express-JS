const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

// Middleware -> Plugin
app.use(express.urlencoded({ extended: true })); // bodyParser -> change to express

// Create Custom Middleware
app.use(function (req, res, next) {
  const log = `\n${Date.now()} : ${req.method} : ${
    req.path
  } : New Request Recived`;
  fs.appendFile("log.txt", log, (err) => {
    next();
  });
});

// ROUTES
app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// Rest Api Points
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Adding Dynamic routes
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  res.json(user);
});

// Post Request for creating new user
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    res.json({ status: "pending", id: users.length });
  });
});

// Patch Request to edit the user with id
app.patch("/api/users/:id", (req, res) => {
  res.json({ status: "pending" });
});

// Delete Request to delete the user with id
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedUsers = users.filter((user) => {
    return user.id !== id;
  });
  fs.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(updatedUsers),
    (err, data) => {
      res.json({ status: `User Deleted with Id : ${id}` });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`);
});
