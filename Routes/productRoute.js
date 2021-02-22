// Importing modules
const express = require("express");
const router = express.Router();

const productController = require("../controller/productController");

/**
 * To get all products
 * GET request.
 * Endpoint: api/products?cat=any&page=1&size=1
 **/
router.get("/products", productController.getAllProduct);


/**
 * To create a product
 * POST request.
 * Endpoint: api/products/new
 **/
router.post("/products/new", productController.productCreate);

/**
 * To get a product detail
 * GET request.
 * Endpoint: api/products/:id
 **/
router.get("/products/:id", productController.productDetail);

/**
 * To update a product
 * PATCH request.
 * Endpoint: api/products/:id
 **/
router.patch("/products/:id", productController.productUpdate);

/**
 * To delete a product
 * DELETE request.
 * Endpoint: api/products/:id
 **/
router.delete("/products/:id", productController.productDelete);

module.exports = router;