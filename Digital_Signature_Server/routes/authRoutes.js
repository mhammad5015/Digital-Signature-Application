const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const emailController = require("../controllers/emailController");
const Validator = require("../middlewares/validationMiddleware");
const multer = require("../util/multer");

// routes:
router.post(
  "/user/register",
  // multer.uploadImage.none(),
  Validator.registerValidation,
  authController.register
);

router.post("/user/login", Validator.loginValidation, authController.login);

router.post("/user/email", emailController.sendVerificationEmail);

module.exports = router;
