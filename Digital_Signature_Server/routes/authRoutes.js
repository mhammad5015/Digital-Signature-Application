const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const Validator = require("../middlewares/validationMiddleware");

// routes:
router.post("/user/register", Validator.registerValidation, authController.register);
router.post("/user/login", Validator.loginValidation, authController.login);

module.exports = router;
