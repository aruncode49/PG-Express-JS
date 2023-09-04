const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// Connect the App to MongoDb
mongoose
  .connect("mongodb://127.0.0.1:27017/express-app")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("ERROR: ", err));

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create Model Using the User Schema
const User = mongoose.model("user", userSchema);

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
app.get("/users", async (req, res) => {
  const allDBUsers = await User.find({});

  const html = `
    <ul>
        ${allDBUsers
          .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
          .join("")}
    </ul>
    `;
  res.send(html);
});

// Rest Api Points
app.get("/api/users", async (req, res) => {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
});

// Adding Dynamic routes
app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
});

// Post Request for creating new user
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required.." });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "Success" });
});

// Patch Request to edit the user with id
app.patch("/api/users/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
  return res.json({ status: "Success" });
});

// Delete Request to delete the user with id
app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ msg: "Success" });
});

app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`);
});
