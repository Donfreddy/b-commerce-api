const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");

/**
 * For Getting blog index
 * GET request.
 * Endpoint: api/blog/
 **/
router.get("/", blogController.blog_index);

/**
 * For Getting all blogs posts
 * GET request.
 * Endpoint: api/blog/all-blogs
 **/
router.get("/all-blogs", blogController.blog_allBlog);

module.exports = router;
