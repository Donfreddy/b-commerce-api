// Importing modules
const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * For Getting all users
 * Require authentification
 * GET request.
 * Endpoint: api/test/users
 **/
router.get("/users", authMiddleware.requireAuth, userController.getAllUsers);

/**
 * For update user info.
 * Patch request.
 * Endpoint: api/test/users/:id
 **/
router.patch("/users/:id", userController.updateUser);

/**
 * For delleting a user.
 * Delete request.
 * Endpoint: api/test/users/:id
 **/
router.get("/users/:id", userController.deleteUser);

module.exports = router;
