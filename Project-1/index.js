const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

// Middleware -> Plugin
app.use(express.urlencoded({ extended: true })); // bodyParser -> change to express

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
  res.json({ status: "pending" });
});

// Note: We can merge these request with same route
// app
//   .route("/api/users/:id")
//   .get((req, res) => {})
//   .patch(() => {})
//   .delete((req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`);
});
