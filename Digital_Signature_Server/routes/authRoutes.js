const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const Validator = require("../middlewares/validationMiddleware");
const multer = require("../util/multer");

// routes:
router.post(
  "/user/register",
  // multer.uploadImage.none(),
  Validator.userRegisterValidation,
  authController.userRegister
);
router.post(
  "/user/login",
  Validator.uaerLoginValidation,
  authController.userLogin
);

router.post(
  "/admin/login",
  Validator.adminLoginValidation,
  authController.adminLogin
);

module.exports = router;
