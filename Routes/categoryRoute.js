// Importing modules
const express = require("express");
const router = express.Router();

const categoryController = require("../controller/categoryController");

/**
 * To get all categories
 * GET request.
 * Endpoint: api/categories
 **/
router.get("/categories", categoryController.getAllCategories);

/**
 * To get all product per category
 * GET request.
 * Endpoint: api/categories/:id
 **/
router.get("/categories/:id", categoryController.productPerCategory);

module.exports = router;