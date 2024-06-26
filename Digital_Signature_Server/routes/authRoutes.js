const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
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



module.exports = router;
