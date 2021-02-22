// Importing modules
const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer_config");

const userController = require("../controller/userController");
//const authMiddleware = require("../middleware/authMiddleware");

/**
 * For Getting all users
 * Require authentification
 * GET request.
 * Endpoint: api/users
 **/
router.get("/users", userController.getAllUsers);

/**
 * For Getting all users
 * Require authentification
 * GET request.
 * Endpoint: api/users/:id
 **/
router.get("/users/:id", userController.getUser);

/**
 * For update user info.
 * Patch request.
 * Endpoint: api/users/:id
 **/
router.patch("/users/:id", multer, userController.updateUser);

/**
 * For delleting a user.
 * Delete request.
 * Endpoint: api/users/:id
 **/
router.get("/users/:id", userController.deleteUser);

/**
 * User wishlist
 */

/**
 * To get all user wishlist product
 * Require authentification
 * GET request.
 * Endpoint: api/test/users/:userId/wishlists
 **/
router.get("/users/:userId/wishlists", userController.getWishlist);

/**
 * To add user wishlist product.
 * Require authentification
 * Post request.
 * Endpoint: api/test/users/:userId/wishlist/:productId
 **/
router.post(
  "/users/:userId/wishlist/:productId",
  userController.addWishlistItem
);

/**
 * To remove user wishlist product.
 * Require authentification
 * Delete request.
 * Endpoint: api/test/users/:userId/wishlist/:productId
 **/
router.delete(
  "/users/:userId/wishlist/:productId",
  userController.removeWishlistItem
);

module.exports = router;

/**
 * For test
 */
// my id: 6014e07e96b32330bc71d459
// product: 60134cea5e3f3890f80a095b

