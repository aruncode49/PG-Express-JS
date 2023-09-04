const User = require("../models/user");

// Get all users
const handleGetAllUsers = async (req, res) => {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
};

// Get user by Id
const handleGetUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
};

// Update user by Id
const handleUpdateUserById = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
  return res.json({ status: "Success" });
};

// Delete user by Id
const handleDeleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ msg: "Success" });
};

// Create New User
const handleCreateNewUser = async (req, res) => {
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

  return res.status(201).json({ msg: "Success", id: result._id });
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
