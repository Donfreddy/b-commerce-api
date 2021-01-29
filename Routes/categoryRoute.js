// Importing modules
const express = require("express");
const router = express.Router();

const categoryController = require("../controller/categoryController");

/**
 * For Getting all categories
 * GET request.
 * Endpoint: api/categories
 **/
router.get("/categories", categoryController.getAllCategories);

module.exports = router;
