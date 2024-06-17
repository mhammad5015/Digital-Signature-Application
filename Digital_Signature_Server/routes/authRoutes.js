const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const Validator = require("../middlewares/validationMiddleware");

// routes:
router.post("/register", Validator.registerValidation, authController.register);

router.post("/login", Validator.loginValidation, authController.login);

module.exports = router;
