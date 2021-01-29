const express = require("express");
const router = express.Router();

const Authcontroller = require("../controller/AuthController");

/**
 * For register new user.
 * POST request.
 * Endpoint: api/auth/register
 **/
router.post("/register", Authcontroller.register);

/**
 * For login user.
 * POST request.
 * Endpoint: api/auth/login
 **/
router.post("/login", Authcontroller.login);

module.exports = router;
