const express = require("express");
const router = express.Router();

// load ccontroller
const AuthController = require("../controllers/auth.controller.js");
const AuthValidator = require("../validators/auth.validator.js");

// load validator

// Register route
router.post("/register", AuthValidator.register(), AuthController.register);
router.post(
  "/manager/register",
  AuthValidator.registerManager(),
  AuthController.registerManager
);

// Login route
router.post("/login", AuthValidator.login(), AuthController.login);

module.exports = router;
