const express = require("express");

const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

// Use express router
const router = express.Router();

// Routes => (Get all users), (Create New User)
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

// Routes => (Get user by id), (Update user by id), (Delete user by id)
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

// Export Router
module.exports = router;
